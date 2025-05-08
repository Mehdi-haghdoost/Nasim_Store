const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { AddressType, AddressInputType, UpdateAddressDefaultInputType } = require("../types/address.types");
const { validateToken } = require("../../../utils/authBackend");
const AddressModel = require('../../../../models/Address');
const UserModel = require('../../../../models/User');
const { provinces, cities } = require("../../../../data/provincesCities");

const addNewAddress = {
    type: AddressType,
    args: {
        input: { type: new GraphQLNonNull(AddressInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('کاربر احراز هویت نشده است')
            }

            const { street, province, city, fullAddress, isDefault } = input;

            // اعتبارسنجی province و city
            if (!provinces.includes(province)) {
                throw new Error('استان نامعتبر است');
            }
            if (!cities[province].includes(city)) {
                throw new Error('شهر نامعتبر است');
            }

            // اگه isDefault true باشه، بقیه آدرس‌ها رو غیرپیش‌فرض کن
            if (isDefault) {
                await AddressModel.updateMany(
                    { user: user._id, isDefault: true },
                    { $set: { isDefault: false } }
                );
            }

            const newAddress = new AddressModel({
                user: user._id,
                street,
                province,
                city,
                fullAddress,
                isDefault: isDefault || false,
                createdAt: new Date().toISOString(),
            });

            const savedAddress = await newAddress.save();

            // اضافه کردن آدرس به لیست آدرس‌های کاربر
            await UserModel.findByIdAndUpdate(
                user._id,
                { $push: { addresses: savedAddress._id } },
                { new: true }
            );

            return savedAddress;
        } catch (error) {
            throw new Error(`خطا در ثبت آدرس: ${error.message}`);
        }
    }
}


const deleteAddress = {
    type: GraphQLBoolean,
    args: {
        addressId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { addressId }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) throw new Error('کاربر احراز هویت نشده است');

            const address = await AddressModel.findOne({ _id: addressId, user: user._id });
            if (!address) throw new Error('آدرس مورد نظر یافت نشد یا شما مجاز به حذف آن نیستید');

            if (address.isDefault) {
                const otherAddress = await AddressModel.findOne({ user: user._id, _id: { $ne: addressId } });
                if (otherAddress) {
                    otherAddress.isDefault = true;
                    await otherAddress.save();
                }
            }

            await UserModel.findByIdAndUpdate(user._id, { $pull: { addresses: addressId } });
            await AddressModel.findByIdAndDelete(addressId);

            return true;
        } catch (error) {
            throw new Error(`خطا در حذف آدرس: ${error.message}`);
        }
    },
};

const updateAddressDefault = {
    type: AddressType,
    args: {
        input: { type: new GraphQLNonNull(UpdateAddressDefaultInputType) },
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const { addressId, isDefault } = input;
            const user = await validateToken(req);
            if (!user) throw new Error('کاربر احراز هویت نشده است');

            const address = await AddressModel.findOne({ _id: addressId, user: user._id });
            if (!address) throw new Error('آدرس مورد نظر یافت نشد یا شما مجاز به تغییر آن نیستید');

            if (isDefault) {
                await AddressModel.updateMany(
                    { user: user._id, _id: { $ne: addressId } },
                    { $set: { isDefault: false } }
                );
            } else {
                const defaultAddressesCount = await AddressModel.countDocuments({
                    user: user._id,
                    isDefault: true,
                    _id: { $ne: addressId },
                });

                if (defaultAddressesCount === 0) {
                    const otherAddress = await AddressModel.findOne({
                        user: user._id,
                        _id: { $ne: addressId },
                    });

                    if (otherAddress) {
                        otherAddress.isDefault = true;
                        await otherAddress.save();
                    } else {
                        throw new Error('نمی‌توانید تنها آدرس خود را غیر پیش‌فرض کنید');
                    }
                }
            }

            address.isDefault = isDefault;
            await address.save();

            return address;
        } catch (error) {
            throw new Error(`خطا در به‌روزرسانی آدرس: ${error.message}`);
        }
    },
};

// افزودن resolver برای به‌روزرسانی آدرس
const updateAddress = {
    type: AddressType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(AddressInputType) }
    },
    resolve: async (_, { id, input }, { req }) => {
        try {
            console.log("Update address resolver called with:", { id, input });

            const user = await validateToken(req);
            if (!user) throw new Error('کاربر احراز هویت نشده است');

            const { street, province, city, fullAddress, isDefault, country } = input;

            // اعتبارسنجی province و city
            if (!provinces.includes(province)) {
                throw new Error('استان نامعتبر است');
            }
            if (!cities[province].includes(city)) {
                throw new Error('شهر نامعتبر است');
            }

            // بررسی وجود آدرس و دسترسی کاربر
            const address = await AddressModel.findOne({ _id: id, user: user._id });
            if (!address) throw new Error('آدرس مورد نظر یافت نشد یا شما مجاز به تغییر آن نیستید');

            console.log("Found address in DB:", address);

            // اگر isDefault تغییر کرده و true شده است
            if (isDefault && !address.isDefault) {
                await AddressModel.updateMany(
                    { user: user._id, _id: { $ne: id } },
                    { $set: { isDefault: false } }
                );
            }
            // اگر isDefault تغییر کرده و false شده است
            else if (!isDefault && address.isDefault) {
                const defaultAddressesCount = await AddressModel.countDocuments({
                    user: user._id,
                    isDefault: true,
                    _id: { $ne: id },
                });

                if (defaultAddressesCount === 0) {
                    const otherAddress = await AddressModel.findOne({
                        user: user._id,
                        _id: { $ne: id },
                    });

                    if (otherAddress) {
                        otherAddress.isDefault = true;
                        await otherAddress.save();
                    } else {
                        throw new Error('نمی‌توانید تنها آدرس خود را غیر پیش‌فرض کنید');
                    }
                }
            }

            // به‌روزرسانی آدرس
            const updatedAddress = await AddressModel.findByIdAndUpdate(
                id,
                {
                    street,
                    province,
                    city,
                    fullAddress,
                    isDefault,
                    country: country || 'ایران',
                    updatedAt: new Date().toISOString()
                },
                { new: true }
            );

            console.log("Updated address:", updatedAddress);

            return updatedAddress;
        } catch (error) {
            console.error("Error in updateAddress resolver:", error);
            throw new Error(`خطا در به‌روزرسانی آدرس: ${error.message}`);
        }
    }
};

module.exports = {
    addNewAddress,
    deleteAddress,
    updateAddressDefault,
    updateAddress,
};
const { GraphQLNonNull, GraphQLID } = require("graphql");
const { OrderType, CreateOrderInputType, UpdateOrderInputType } = require("../types/order.types");
const { validateToken } = require("../../../utils/authBackend");
const OrderModel = require('../../../../models/Order');
const UserModel = require('../../../../models/User');
const ProductModel = require('../../../../models/Product');

// ایجاد سفارش جدید
const createOrder = {
    type: OrderType,
    args: {
        input: { type: new GraphQLNonNull(CreateOrderInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            console.log('🛍️ شروع ایجاد سفارش...');
            
            // بررسی احراز هویت
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای ثبت سفارش باید وارد شوید');
            }

            console.log('✅ کاربر تایید شد:', user._id);

            const { 
                items, 
                recipient, 
                phoneNumber, 
                shippingAddress, 
                postalCode, 
                totalAmount, 
                paymentMethod, 
                discountCoupon, 
                shippingCost = 0, 
                deliveryDate 
            } = input;

            // اعتبارسنجی آیتم‌ها
            if (!items || items.length === 0) {
                throw new Error('سفارش باید حداقل شامل یک محصول باشد');
            }

            console.log(`📦 بررسی ${items.length} محصول...`);

            // بررسی وجود و موجودی محصولات
            for (const item of items) {
                const product = await ProductModel.findById(item.product);
                if (!product) {
                    throw new Error(`محصول ${item.name} یافت نشد`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`موجودی محصول ${item.name} کافی نیست. موجودی: ${product.stock}`);
                }
                console.log(`✅ محصول ${product.title} تایید شد`);
            }

            // آماده کردن داده‌های سفارش
            const orderData = {
                user: user._id,
                items: items.map(item => ({
                    product: item.product,
                    quantity: item.quantity,
                    name: item.name,
                    price: item.price,
                    image: item.image
                })),
                recipient,
                phoneNumber,
                shippingAddress,
                postalCode,
                totalAmount,
                paymentMethod,
                shippingCost,
                status: 'PENDING',
                orderDate: new Date()
            };

            // اضافه کردن کد تخفیف اگر موجود باشد
            if (discountCoupon) {
                orderData.discountCoupon = discountCoupon;
            }

            // اضافه کردن تاریخ تحویل اگر موجود باشد
            if (deliveryDate) {
                orderData.deliveryDate = new Date(deliveryDate);
            }

            console.log('💾 ذخیره سفارش در دیتابیس...');

            // ایجاد سفارش (trackingId خودکار تولید می‌شود)
            const newOrder = new OrderModel(orderData);
            await newOrder.save();

            console.log('✅ سفارش ذخیره شد با trackingId:', newOrder.trackingId);

            // کاهش موجودی محصولات
            console.log('📉 به‌روزرسانی موجودی محصولات...');
            for (const item of items) {
                await ProductModel.findByIdAndUpdate(
                    item.product,
                    { $inc: { stock: -item.quantity } }
                );
                console.log(`✅ موجودی محصول ${item.name} کاهش یافت`);
            }

            // افزودن سفارش به لیست سفارشات کاربر
            console.log('👤 به‌روزرسانی لیست سفارشات کاربر...');
            await UserModel.findByIdAndUpdate(
                user._id,
                { $push: { orders: newOrder._id } }
            );

            // پاک کردن سبد خرید کاربر
            console.log('🛒 پاک کردن سبد خرید...');
            await UserModel.findByIdAndUpdate(
                user._id,
                { 
                    $set: { 
                        'cart.items': [],
                        'cart.totalPrice': 0,
                        'cart.totalDiscount': 0,
                        'cart.finalPrice': 0,
                        'cart.lastModified': new Date()
                    }
                }
            );

            // دریافت سفارش با populate
            console.log('📋 دریافت سفارش نهایی...');
            const populatedOrder = await OrderModel.findById(newOrder._id)
                .populate({
                    path: 'user',
                    select: 'username email phone'
                })
                .populate({
                    path: 'items.product',
                    select: 'title image price discountedPrice hasDiscount category brandIcon stock'
                });

            console.log('🎉 سفارش با موفقیت ایجاد شد!');

            return {
                ...populatedOrder.toObject(),
                orderDate: populatedOrder.orderDate.toISOString(),
                deliveryDate: populatedOrder.deliveryDate ? populatedOrder.deliveryDate.toISOString() : null,
                createdAt: populatedOrder.createdAt.toISOString(),
                updatedAt: populatedOrder.updatedAt.toISOString()
            };

        } catch (error) {
            console.error('❌ خطا در ایجاد سفارش:', error);
            throw new Error(`خطا در ثبت سفارش: ${error.message}`);
        }
    }
};

// به‌روزرسانی سفارش
const updateOrder = {
    type: OrderType,
    args: {
        input: { type: new GraphQLNonNull(UpdateOrderInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            console.log('🔄 شروع به‌روزرسانی سفارش...');
            
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای به‌روزرسانی سفارش باید وارد شوید');
            }

            const { orderId, status, deliveryDate, trackingId } = input;

            // پیدا کردن سفارش
            const order = await OrderModel.findById(orderId);
            if (!order) {
                throw new Error('سفارش یافت نشد');
            }

            // بررسی مجوز
            if (order.user.toString() !== user._id.toString() && user.role !== 'ADMIN') {
                throw new Error('شما مجوز به‌روزرسانی این سفارش را ندارید');
            }

            // آماده کردن داده‌های به‌روزرسانی
            const updateData = {};
            if (status) updateData.status = status;
            if (deliveryDate) updateData.deliveryDate = new Date(deliveryDate);
            if (trackingId) updateData.trackingId = trackingId;

            console.log('💾 به‌روزرسانی سفارش...');

            const updatedOrder = await OrderModel.findByIdAndUpdate(
                orderId,
                updateData,
                { new: true }
            )
            .populate({
                path: 'user',
                select: 'username email phone'
            })
            .populate({
                path: 'items.product',
                select: 'title image price discountedPrice hasDiscount category stock'
            });

            console.log('✅ سفارش به‌روزرسانی شد');

            return {
                ...updatedOrder.toObject(),
                orderDate: updatedOrder.orderDate.toISOString(),
                deliveryDate: updatedOrder.deliveryDate ? updatedOrder.deliveryDate.toISOString() : null,
                createdAt: updatedOrder.createdAt.toISOString(),
                updatedAt: updatedOrder.updatedAt.toISOString()
            };

        } catch (error) {
            console.error('❌ خطا در به‌روزرسانی سفارش:', error);
            throw new Error(`خطا در به‌روزرسانی سفارش: ${error.message}`);
        }
    }
};

// لغو سفارش
const cancelOrder = {
    type: OrderType,
    args: {
        orderId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { orderId }, { req }) => {
        try {
            console.log('❌ شروع لغو سفارش...');
            
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای لغو سفارش باید وارد شوید');
            }

            const order = await OrderModel.findById(orderId);
            if (!order) {
                throw new Error('سفارش یافت نشد');
            }

            // بررسی مجوز
            if (order.user.toString() !== user._id.toString()) {
                throw new Error('شما مجوز لغو این سفارش را ندارید');
            }

            // بررسی قابلیت لغو
            if (order.status !== 'PENDING') {
                throw new Error('فقط سفارشات در انتظار قابل لغو هستند');
            }

            console.log('🔄 تغییر وضعیت به لغو شده...');

            // تغییر وضعیت
            order.status = 'CANCELLED';
            await order.save();

            // بازگرداندن موجودی محصولات
            console.log('📈 بازگرداندن موجودی محصولات...');
            for (const item of order.items) {
                await ProductModel.findByIdAndUpdate(
                    item.product,
                    { $inc: { stock: item.quantity } }
                );
                console.log(`✅ موجودی محصول بازگردانده شد`);
            }

            // دریافت سفارش با populate
            const cancelledOrder = await OrderModel.findById(orderId)
                .populate({
                    path: 'user',
                    select: 'username email phone'
                })
                .populate({
                    path: 'items.product',
                    select: 'title image price discountedPrice hasDiscount category stock'
                });

            console.log('✅ سفارش لغو شد');

            return {
                ...cancelledOrder.toObject(),
                orderDate: cancelledOrder.orderDate.toISOString(),
                deliveryDate: cancelledOrder.deliveryDate ? cancelledOrder.deliveryDate.toISOString() : null,
                createdAt: cancelledOrder.createdAt.toISOString(),
                updatedAt: cancelledOrder.updatedAt.toISOString()
            };

        } catch (error) {
            console.error('❌ خطا در لغو سفارش:', error);
            throw new Error(`خطا در لغو سفارش: ${error.message}`);
        }
    }
};

module.exports = {
    createOrder,
    updateOrder,
    cancelOrder
};
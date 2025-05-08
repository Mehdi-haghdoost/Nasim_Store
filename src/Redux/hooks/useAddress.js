import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addAddress, 
    deleteAddress, 
    setDefaultAddress, 
    getAllAddresses,
    updateAddress // این را اضافه خواهیم کرد
} from '../actions/addressThunks';

const useAddress = () => {
    const dispatch = useDispatch();
    const { user, cachedAddresses, loading, error } = useSelector(state => state.auth);

    // دریافت لیست آدرس‌ها در زمان بارگذاری
    useEffect(() => {
        if (user?._id && (!cachedAddresses || cachedAddresses.length === 0)) {
            dispatch(getAllAddresses());
        }
    }, [user, cachedAddresses, dispatch]);

    // گرفتن آدرس با شناسه
    const getAddressById = (addressId) => {
        const addresses = user?.addresses || cachedAddresses || [];
        return addresses.find(addr => addr._id === addressId);
    };

    // افزودن آدرس جدید
    const handleAddAddress = (addressData) => {
        return dispatch(addAddress(addressData));
    };

    // حذف آدرس
    const handleDeleteAddress = (addressId) => {
        return dispatch(deleteAddress(addressId));
    };

    // تنظیم آدرس پیش‌فرض
    const handleSetDefaultAddress = (addressId) => {
        return dispatch(setDefaultAddress(addressId));
    };

    // به‌روزرسانی آدرس
    const handleUpdateAddress = (addressData) => {
        return dispatch(updateAddress(addressData));
    };

    return {
        addresses: user?.addresses || cachedAddresses || [],
        loading,
        error,
        getAddressById,
        addAddress: handleAddAddress,
        deleteAddress: handleDeleteAddress,
        setDefaultAddress: handleSetDefaultAddress,
        updateAddress: handleUpdateAddress
    };
};

export default useAddress;
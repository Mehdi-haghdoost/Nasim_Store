const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const { OrderType } = require("../types/order.types");
const { validateToken } = require("../../../utils/authBackend");
const OrderModel = require('../../../../models/Order');

// دریافت سفارشات کاربر
const getUserOrders = {
    type: new GraphQLList(OrderType),
    args: {
        userId: { type: GraphQLID }
    },
    resolve: async (_, { userId }, { req }) => {
        try {
            console.log('🔍 شروع getUserOrders...');
            
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای مشاهده سفارشات باید وارد شوید');
            }

            console.log('✅ کاربر تایید شد:', user._id);

            // تعیین کاربر هدف
            const targetUserId = userId || user._id;
            if (targetUserId.toString() !== user._id.toString() && user.role !== 'ADMIN') {
                throw new Error('شما مجوز مشاهده سفارشات این کاربر را ندارید');
            }

            console.log('📋 دریافت سفارشات برای کاربر:', targetUserId);

            // دریافت سفارشات با populate
            const orders = await OrderModel.find({ user: targetUserId })
                .populate({
                    path: 'user',
                    select: 'username email phone'
                })
                .populate({
                    path: 'items.product',
                    select: 'title image price discountedPrice hasDiscount category stock brandIcon originalName'
                })
                .sort({ createdAt: -1 });

            console.log(`✅ ${orders.length} سفارش یافت شد`);

            // فرمت کردن داده‌ها
            const formattedOrders = orders.map(order => ({
                ...order.toObject(),
                orderDate: order.orderDate.toISOString(),
                deliveryDate: order.deliveryDate ? order.deliveryDate.toISOString() : null,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            }));

            return formattedOrders;

        } catch (error) {
            console.error('❌ خطا در getUserOrders:', error);
            throw new Error(`خطا در دریافت سفارشات: ${error.message}`);
        }
    }
};

// دریافت سفارش با ID
const getOrderById = {
    type: OrderType,
    args: {
        orderId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { orderId }, { req }) => {
        try {
            console.log('🔍 شروع getOrderById برای:', orderId);
            
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای مشاهده جزئیات سفارش باید وارد شوید');
            }

            const order = await OrderModel.findById(orderId)
                .populate({
                    path: 'user',
                    select: 'username email phone'
                })
                .populate({
                    path: 'items.product',
                    select: 'title image price discountedPrice hasDiscount category stock brandIcon originalName description'
                });

            if (!order) {
                throw new Error('سفارش یافت نشد');
            }

            // بررسی مجوز
            if (order.user._id.toString() !== user._id.toString() && user.role !== 'ADMIN') {
                throw new Error('شما مجوز مشاهده این سفارش را ندارید');
            }

            console.log('✅ سفارش یافت شد:', order.trackingId);

            return {
                ...order.toObject(),
                orderDate: order.orderDate.toISOString(),
                deliveryDate: order.deliveryDate ? order.deliveryDate.toISOString() : null,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };

        } catch (error) {
            console.error('❌ خطا در getOrderById:', error);
            throw new Error(`خطا در دریافت سفارش: ${error.message}`);
        }
    }
};

// دریافت سفارش با شماره پیگیری
const getOrderByTrackingId = {
    type: OrderType,
    args: {
        trackingId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, { trackingId }, { req }) => {
        try {
            console.log('🔍 شروع getOrderByTrackingId برای:', trackingId);
            
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای پیگیری سفارش باید وارد شوید');
            }

            const order = await OrderModel.findOne({ trackingId })
                .populate({
                    path: 'user',
                    select: 'username email phone'
                })
                .populate({
                    path: 'items.product',
                    select: 'title image price discountedPrice hasDiscount category stock'
                });

            if (!order) {
                throw new Error('سفارش با این شماره پیگیری یافت نشد');
            }

            // بررسی مجوز
            if (order.user._id.toString() !== user._id.toString() && user.role !== 'ADMIN') {
                throw new Error('شما مجوز مشاهده این سفارش را ندارید');
            }

            console.log('✅ سفارش با trackingId یافت شد');

            return {
                ...order.toObject(),
                orderDate: order.orderDate.toISOString(),
                deliveryDate: order.deliveryDate ? order.deliveryDate.toISOString() : null,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };

        } catch (error) {
            console.error('❌ خطا در getOrderByTrackingId:', error);
            throw new Error(`خطا در پیگیری سفارش: ${error.message}`);
        }
    }
};

// دریافت همه سفارشات (فقط برای ادمین)
const getAllOrders = {
    type: new GraphQLList(OrderType),
    resolve: async (_, args, { req }) => {
        try {
            console.log('🔍 شروع getAllOrders...');
            
            const user = await validateToken(req);
            if (!user || user.role !== 'ADMIN') {
                throw new Error('فقط ادمین‌ها مجوز مشاهده همه سفارشات را دارند');
            }

            const orders = await OrderModel.find()
                .populate({
                    path: 'user',
                    select: 'username email phone'
                })
                .populate({
                    path: 'items.product',
                    select: 'title image price discountedPrice hasDiscount category stock'
                })
                .sort({ createdAt: -1 });

            console.log(`✅ ${orders.length} سفارش برای ادمین یافت شد`);

            return orders.map(order => ({
                ...order.toObject(),
                orderDate: order.orderDate.toISOString(),
                deliveryDate: order.deliveryDate ? order.deliveryDate.toISOString() : null,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            }));

        } catch (error) {
            console.error('❌ خطا در getAllOrders:', error);
            throw new Error(`خطا در دریافت سفارشات: ${error.message}`);
        }
    }
};

module.exports = {
    getUserOrders,
    getOrderById,
    getOrderByTrackingId,
    getAllOrders
};
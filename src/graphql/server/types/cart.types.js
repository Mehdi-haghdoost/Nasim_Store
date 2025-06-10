// const { 
//     GraphQLObjectType, 
//     GraphQLID, 
//     GraphQLInt, 
//     GraphQLString, 
//     GraphQLList, 
//     GraphQLFloat, 
//     GraphQLInputObjectType, 
//     GraphQLNonNull 
// } = require("graphql"); 
// const { SellerType } = require("./seller.types"); 
// const { ProductType } = require("./product.types");  

// // تعریف نوع آیتم سبد خرید 
// const CartItemType = new GraphQLObjectType({     
//     name: "CartItem",     
//     fields: {         
//         _id: { type: GraphQLID },         
//         product: { type: ProductType },         
//         quantity: { type: GraphQLInt },         
//         color: { type: GraphQLString },         
//         size: { type: GraphQLString },         
//         selectedSeller: { type: SellerType },     
//     } 
// });  

// // تعریف نوع سبد خرید  
// const CartType = new GraphQLObjectType({     
//     name: "Cart",     
//     fields: {         
//         items: { type: new GraphQLList(CartItemType) },         
//         totalPrice: { type: GraphQLFloat },         
//         totalDiscount: { type: GraphQLFloat },         
//         finalPrice: { type: GraphQLFloat },     
//     } 
// });  

// // ورودی برای افزودن محصول به سبد خرید 
// const AddToCartInputType = new GraphQLInputObjectType({     
//     name: "AddToCartInput",     
//     fields: {         
//         productId: { type: new GraphQLNonNull(GraphQLID) },         
//         quantity: { type: GraphQLInt },         
//         color: { type: GraphQLString },         
//         size: { type: GraphQLString },         
//         sellerId: { type: GraphQLID },     
//     } 
// });  

// // ورودی برای بروزرسانی محصول در سبد خرید 
// const UpdateCartItemInputType = new GraphQLInputObjectType({     
//     name: "UpdateCartItemInput",     
//     fields: {         
//         itemId: { type: new GraphQLNonNull(GraphQLID) },         
//         quantity: { type: new GraphQLNonNull(GraphQLInt) },     
//     } 
// });   

// module.exports = {     
//     CartItemType,     
//     CartType,     
//     AddToCartInputType,     
//     UpdateCartItemInputType 
// };


const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLList, 
    GraphQLFloat, 
    GraphQLInputObjectType, 
    GraphQLNonNull 
} = require("graphql"); 

// تعریف نوع آیتم سبد خرید 
const CartItemType = new GraphQLObjectType({     
    name: "CartItem",     
    fields: () => {
        // Lazy loading برای جلوگیری از circular dependency
        const { ProductType } = require("./product.types");
        const { SellerType } = require("./seller.types");
        
        return {         
            _id: { type: GraphQLID },         
            product: { 
                type: ProductType,
                resolve: async (parent) => {
                    const ProductModel = require("../../../../models/Product");
                    try {
                        return await ProductModel.findById(parent.product)
                            .populate('category')
                            .populate('sellers');
                    } catch (error) {
                        throw new Error(`خطا در بازیابی محصول: ${error.message}`);
                    }
                }
            },         
            quantity: { type: GraphQLInt },         
            color: { type: GraphQLString },         
            size: { type: GraphQLString },         
            selectedSeller: { 
                type: SellerType,
                resolve: async (parent) => {
                    if (!parent.selectedSeller) return null;
                    const SellerModel = require("../../../../models/Seller");
                    try {
                        return await SellerModel.findById(parent.selectedSeller);
                    } catch (error) {
                        throw new Error(`خطا در بازیابی فروشنده: ${error.message}`);
                    }
                }
            },
            addedAt: { type: GraphQLString },
        };
    }
});  

// تعریف نوع سبد خرید  
const CartType = new GraphQLObjectType({     
    name: "Cart",     
    fields: {         
        items: { type: new GraphQLList(CartItemType) },         
        totalPrice: { type: GraphQLFloat },         
        totalDiscount: { type: GraphQLFloat },         
        finalPrice: { type: GraphQLFloat },
        lastModified: { type: GraphQLString },
    } 
});  

// ورودی برای افزودن محصول به سبد خرید 
const AddToCartInputType = new GraphQLInputObjectType({     
    name: "AddToCartInput",     
    fields: {         
        productId: { type: new GraphQLNonNull(GraphQLID) },         
        quantity: { type: GraphQLInt, defaultValue: 1 },         
        color: { type: GraphQLString },         
        size: { type: GraphQLString },         
        sellerId: { type: GraphQLID },     
    } 
});  

// ورودی برای بروزرسانی محصول در سبد خرید 
const UpdateCartItemInputType = new GraphQLInputObjectType({     
    name: "UpdateCartItemInput",     
    fields: {         
        itemId: { type: new GraphQLNonNull(GraphQLID) },         
        quantity: { type: new GraphQLNonNull(GraphQLInt) },     
    } 
});   

// ورودی برای آیتم‌های سبد مهمان
const GuestCartItemInputType = new GraphQLInputObjectType({
    name: "GuestCartItemInput",
    fields: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        sellerId: { type: GraphQLID },
    }
});

// ورودی برای سینک کردن سبد مهمان با سبد کاربر
const SyncCartInputType = new GraphQLInputObjectType({
    name: "SyncCartInput",
    fields: {
        guestCartItems: { 
            type: new GraphQLList(GuestCartItemInputType)
        }
    }
});

module.exports = {     
    CartItemType,     
    CartType,     
    AddToCartInputType,     
    UpdateCartItemInputType,
    GuestCartItemInputType,
    SyncCartInputType
};
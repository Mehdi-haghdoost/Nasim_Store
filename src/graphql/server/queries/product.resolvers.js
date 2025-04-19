const { GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInt } = require("graphql");
const { ProductType } = require("../types/product.types");
const ProductModel = require("../../../../models/Product");

// const product = {
//     type: ProductType,
//     args: {
//         id: { type: new GraphQLNonNull(GraphQLID) }
//     },
//     resolve: async (_, { id }) => {
//         try {
//             console.log("Product resolver called with ID:", id);
//             const product = await ProductModel.findById(id)
//                 .populate({
//                     path: 'sellers',
//                     select: '_id name' // فقط فیلدهای مورد نیاز
//                 })
//                 .populate('category')
//                 .populate({
//                     path: 'comments',
//                     populate: [
//                         { path: 'user', select: 'username' },
//                         {
//                             path: 'replies',
//                             populate: { path: 'user', select: 'username' }
//                         }
//                     ]
//                 });

//             if (!product) {
//                 throw new Error(`محصول با شناسه ${id} پیدا نشد`);
//             }

//             return product;
//         } catch (error) {
//             console.error("Error in product resolver:", error);
//             throw new Error(`خطا در دریافت محصول: ${error.message}`);
//         }
//     }
// };


const product = {
    type: ProductType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { id }) => {
        try {
            console.log("Product resolver called with ID:", id);

            const product = await ProductModel.findById(id)
                .populate({
                    path: 'sellers',
                    select: '_id name'
                })
                .populate('category')
                .populate({
                    path: 'comments',
                    populate: [
                        {
                            path: 'user',
                            select: 'username',
                        },
                        {
                            path: 'replies',
                            populate: {
                                path: 'user',
                                select: 'username',
                            }
                        }
                    ]
                });

            if (!product) {
                throw new Error(`محصول با شناسه ${id} پیدا نشد`);
            }

            return product;
        } catch (error) {
            console.error("Error in product resolver:", error);
            throw new Error(`خطا در دریافت محصول: ${error.message}`);
        }
    }
};
const similarProducts = {
    type: new GraphQLList(ProductType),
    args: {
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
        limit: { type: GraphQLInt }
    },
    resolve: async (_, { categoryId, limit = 5 }) => {
        try {
            console.log("Similar products resolver called with categoryId:", categoryId);
            const products = await ProductModel.find({ category: categoryId })
                .populate('sellers')
                .limit(limit)
                .sort({ createdAt: -1 });
            console.log("Similar products found:", products.length);
            return products;
        } catch (error) {
            console.error("Error in similarProducts resolver:", error);
            throw new Error(`خطا در دریافت محصولات مشابه: ${error.message}`);
        }
    }
};

const bestSellingProducts = {
    type: new GraphQLList(ProductType),
    args: {
        limit: { type: GraphQLInt }
    },
    resolve: async (_, { limit = 5 }) => {
        try {
            console.log("Best selling products resolver called");
            const products = await ProductModel.find()
                .populate('sellers')
                .sort({ salesCount: -1 })
                .limit(limit);
            console.log("Best selling products found:", products.length);
            return products;
        } catch (error) {
            console.error("Error in bestSellingProducts resolver:", error);
            throw new Error(`خطا در دریافت محصولات پرفروش: ${error.message}`);
        }
    }
};

module.exports = {
    product,
    similarProducts,
    bestSellingProducts
};
const { GraphQLNonNull } = require("graphql");
const { ProductType, ProductInputType } = require("../types/product.types");
const ProductModel = require("../../../models/Product");
const CategoryModel = require("../../../models/Category");
const SellerModel = require("../../../models/Seller");
const { validateToken } = require("@/utils/auth");

const addProduct = {
    type: ProductType,
    args: {
        input: { type: new GraphQLNonNull(ProductInputType) },
    },
    resolve: async (_, { input }, context) => {
        try {
            const { role } = await validateToken(context.req);
            if (role !== "ADMIN") {
                throw new Error("دسترسی لازم برای انجام این کار را ندارید")
            }

            // اعتبار سنجی برای category : 
            const categoryId = await CategoryModel.findById(input.category)
            if (!categoryId) {
                throw new Error("دسته‌بندی پیدا نشد")
            }

            // اعتبار سنجی برای seller و وجود داشنن فروشنده :
            for (const sellerId of input.sellers) {
                const seller = await SellerModel.findById(sellerId)
                if (!seller) {
                    throw new Error(`فروشنده با شناسه ${sellerId} پیدا نشد`)
                }
            }

            const newProduct = new ProductModel({
                ...input,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

            const savedProduct = await newProduct.save();

            return savedProduct;
        } catch (error) {
            throw new Error(`خطا در ایجاد محصول: ${error.message}`)
        }
    }
}


module.exports = { addProduct };
const { GraphQLNonNull } = require("graphql");
const { ProductType, ProductInputType } = require("../types/product.types");
const ProductModel = require("../../../models/Product");
const CategoryModel = require("../../../models/Category");
const SellerModel = require("../../../models/Seller");
const { validateToken } = require("../../utils/authBackend");


const addProduct = {
    type: ProductType,
    args: {
        input: { type: new GraphQLNonNull(ProductInputType) },
    },
    resolve: async (_, { input }, context) => {
        try {
            const { role } = await validateToken(context.req,context.res);
            if (!role) {
                throw new Error("احراز هویت لازم می باشد")
            }
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

            // اعتبار سنجی برای کد تخفیف
            if (input.hasDiscount) {
                if (!input.discountedPrice || input.discountedPrice <= 0) {
                    throw new Error("قیمت تخفیف خورده را وارد کنید وبیشتراز صفر باشد")
                }

                if (input.discountedPrice >= input.price) {
                    throw new Error("قیمت تخفیف خورده باید کمتراز قیمت اصلی باشد")
                }
            } else {
                input.discountedPrice = null;
            }

            const newProduct = new ProductModel({
                image: input.image,
                title: input.title,
                features: input.features || [],
                rating: input.rating || 0,
                highlights: input.highlights || [],
                category: input.category,
                colors: input.colors || [
                    { color: "قرمز", available: true },
                    { color: "مشکی", available: true },
                    { color: "آبی", available: true },
                    { color: "سبز", available: false },
                ],
                stock: input.stock || 0,
                price: input.price,
                discountedPrice: input.discountedPrice,
                hasDiscount: input.hasDiscount || false,
                brandIcon: input.brandIcon,
                originalName: input.originalName,
                description: input.description,
                specifications: input.specifications,
                comments: input.comments || [],
                sellers: input.sellers,
                customerSatisfaction: input.customerSatisfaction || 0,
                salesCount: input.salesCount || 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            const savedProduct = await newProduct.save();

            return savedProduct;
        } catch (error) {
            throw new Error(`خطا در ایجاد محصول: ${error.message}`)
        }
    }
}


module.exports = { addProduct };
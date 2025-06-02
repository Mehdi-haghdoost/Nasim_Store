const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLFloat, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType } = require("graphql");
const { CategoryType } = require("./category.types");
const { SellerType } = require("./seller.types");
const { CommentType } = require("./comment.types");

const HighlightType = new GraphQLObjectType({
    name: "HighlightType",
    fields: () => ({
        feature: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const ColorType = new GraphQLObjectType({
    name: "ColorType",
    fields: () => ({
        color: { type: new GraphQLNonNull(GraphQLString) },
        available: { type: new GraphQLNonNull(GraphQLBoolean) },
    })
})

const FeatureType = new GraphQLObjectType({
    name: "FeatureType",
    fields: () => ({
        key: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const FeatureInputType = new GraphQLInputObjectType({
    name: "FeatureInput",
    fields: () => ({
        key: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) },
    }),
})

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: () => {

        const CategoryModel = require("../../../../models/Category");
        const SellerModel = require("../../../../models/Seller");
        const CommentModel = require("../../../../models/Comment");
        return {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            image: { type: new GraphQLNonNull(GraphQLString) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            features: { type: new GraphQLList(FeatureType) },
            rating: { type: GraphQLFloat },
            highlights: { type: new GraphQLNonNull(new GraphQLList(HighlightType)) },
            category: {
                type: new GraphQLNonNull(CategoryType),
                resolve: async (parent) => {
                    try {
                        const category = await CategoryModel.findById(parent.category);
                        if (!category) {
                            throw new Error(`دسته‌بندی یافت نشد`)
                        }
                        return category;
                    } catch (error) {
                        console.error(`خطا در بازیابی دسته‌بندی:`, error);
                        throw new Error(`خطا در بازیابی دسته‌بندی: ${error.message}`);
                    }
                }
            },
            colors: { type: new GraphQLNonNull(new GraphQLList(ColorType)) },
            stock: { type: new GraphQLNonNull(GraphQLInt) },
            price: { type: new GraphQLNonNull(GraphQLFloat) },
            discountedPrice: { type: GraphQLFloat },
            hasDiscount: { type: GraphQLBoolean },
            brandIcon: { type: new GraphQLNonNull(GraphQLString) },
            originalName: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            specifications: { type: new GraphQLNonNull(GraphQLString) },
            comments: {
                type: new GraphQLList(CommentType),
                resolve: async (parent) => {
                    try {
                        if (!parent.comments || parent.comments.length === 0) {
                            return [];
                        }

                        // Populate کردن user داخل هر کامنت
                        const comments = await CommentModel
                            .find({ _id: { $in: parent.comments } })
                            .populate('user');

                        // فیلتر کردن کامنت‌هایی که user معتبر ندارند
                        return comments.filter(comment => comment.user && comment.user.username);

                    } catch (error) {
                        throw new Error(`خطا در بازیابی کامنت‌ها: ${error.message}`);
                    }
                }
            },
            sellers: {
                type: new GraphQLNonNull(new GraphQLList(SellerType)),
                resolve: async (parent) => {
                    try {
                        const sellers = await SellerModel.find({ _id: { $in: parent.sellers } });
                        return sellers;
                    } catch (error) {
                        console.error(`خطا در بازیابی فروشندگان:`, error);
                        throw new Error(`خطا در بازیابی فروشندگان: ${error.message}`);
                    }
                }
            },
            customerSatisfaction: { type: GraphQLFloat },
            salesCount: { type: new GraphQLNonNull(GraphQLInt) },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            updatedAt: { type: new GraphQLNonNull(GraphQLString) },
        };
    }
})

const HighlightInputType = new GraphQLInputObjectType({
    name: "HighlightInput",
    fields: () => ({
        feature: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const ColorInputType = new GraphQLInputObjectType({
    name: "ColorInput",
    fields: () => ({
        color: { type: new GraphQLNonNull(GraphQLString) },
        available: { type: GraphQLBoolean },
    }),
})

const ProductInputType = new GraphQLInputObjectType({
    name: "ProductInput",
    fields: () => ({
        image: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        features: { type: new GraphQLList(FeatureInputType) },
        rating: { type: GraphQLFloat },
        highlights: { type: new GraphQLList(HighlightInputType) },
        category: { type: new GraphQLNonNull(GraphQLID) },
        colors: { type: new GraphQLList(ColorInputType) },
        stock: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        discountedPrice: { type: GraphQLFloat },
        hasDiscount: { type: GraphQLBoolean },
        brandIcon: { type: new GraphQLNonNull(GraphQLString) },
        originalName: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        specifications: { type: new GraphQLNonNull(GraphQLString) },
        comments: { type: new GraphQLList(GraphQLID) },
        sellers: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) }, // مستقیم ID فروشنده‌ها رو می‌گیره
        customerSatisfaction: { type: GraphQLFloat },
        salesCount: { type: GraphQLInt },
    })
})

module.exports = {
    ProductType,
    ProductInputType,
    HighlightType,
    ColorType,
    HighlightInputType,
    ColorInputType,
    FeatureType,
    FeatureInputType,
}
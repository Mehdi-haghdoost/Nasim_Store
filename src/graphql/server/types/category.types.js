const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInputObjectType, GraphQLList } = require("graphql");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => {
        const { ProductType } = require("./product.types");
        const ProductModel = require("../../../../models/Product");
        return {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            icon: { type: new GraphQLNonNull(GraphQLString) },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            updatedAt: { type: new GraphQLNonNull(GraphQLString) },
            products: {
                type: new GraphQLList(ProductType),
                resolve: async (parent) => {
                    try {
                        return await ProductModel.find({ category: parent._id });
                    } catch (error) {
                        throw new Error(`خطا در گرفتن دسته بندی محصولات ${error.message}`)
                    }
                }
            }
        }

    }
});

const CategoryInputType = new GraphQLInputObjectType({
    name: "CategoryInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        icon: { type: new GraphQLNonNull(GraphQLString) },
    })

})

module.exports = {
    CategoryType,
    CategoryInputType,
}
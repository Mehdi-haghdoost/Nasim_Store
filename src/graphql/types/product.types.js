const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLFloat, GraphQLBoolean, GraphQLInt } = require("graphql");
const CategoryType = require("./category.types");

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

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        features: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        rating: { type: GraphQLFloat },
        highlights: { type: new GraphQLNonNull(new GraphQLList(HighlightType)) },
        category: { type: new GraphQLNonNull(CategoryType) },
        color: { type: new GraphQLNonNull(new GraphQLList(ColorType)) },
        stock: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        discountedPrice: { type: GraphQLFloat },
        hasDiscount: { type: GraphQLBoolean },
        brandIcon: { type: new GraphQLNonNull(GraphQLString) },
        originalName: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        specifications: { type: new GraphQLNonNull(GraphQLString) },
        comments : {type : new GraphQLList(CommentType)},
        
    }
})
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLFloat, GraphQLBoolean, GraphQLInt } = require("graphql");
const {CategoryType} = require("./category.types");
const {SellerType} = require("./seller.types");

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
        comments: { type: new GraphQLList(CommentType) },
        sellers: { type: new GraphQLNonNull(new GraphQLList(SellerType)) },
        customerSatisfaction: { type: GraphQLFloat },
        salesCount: { type: new GraphQLNonNull(GraphQLInt) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    }
})

const HighlightInputType = new GraphQLObjectType({
    name : "HighlightInput",
    fields : () => ({
        feature : {type : new GraphQLNonNull(GraphQLString)},
    }),
});

const ColorInputType = new GraphQLObjectType({
    name : "ColorInput",
    fields : () => ({
        color : {type : new GraphQLNonNull(GraphQLString)},
        available : {type : GraphQLBoolean},
    }),
})

const ProductInputType = new GraphQLObjectType({
    name: "ProductInput",
    fields: () => ({
        image: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        features: { type: new GraphQLList(GraphQLString) },
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
}
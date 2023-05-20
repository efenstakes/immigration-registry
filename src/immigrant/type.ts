import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLList,
} from 'graphql'


// import models here

// types


const ImmigrantType = new GraphQLObjectType({
    name: 'ImmigrantType',
    description: 'Immigrant Type',
    fields: ()=> ({

        _id: {
            type: GraphQLID
        },

        name: {
            type: GraphQLString
        },

        email: {
            type: GraphQLString
        },
        originId: {
            type: GraphQLString
        },

        originCountry: {
            type: GraphQLString,
        },

        entryPoint: {
            type: GraphQLString,
        },

        stayGround: {
            type: GraphQLString,
        },

        centerOfRegistry: {
            type: GraphQLString,
        },
        
    })
})

export default ImmigrantType

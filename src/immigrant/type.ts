import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLList,
} from 'graphql'


// import models here

// types


const RequirementType = new GraphQLObjectType({
    name: 'RequirementType',
    description: 'Requirement Type',
    fields: ()=> ({

        requirement: {
            type: GraphQLString,
        },
        
        status: {
            type: GraphQLString,
        },
        
        comments: {
            type: GraphQLString,
        },
        
        updatedOn: {
            type: GraphQLFloat,
        },
        
        updatedBy: {
            type: GraphQLString,
        },

    })
})
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
        
        requirements: {
            type: new GraphQLList(RequirementType)
        },
        
    })
})

export default ImmigrantType

import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
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
const RequestType = new GraphQLObjectType({
    name: 'RequestType',
    description: 'Request Type',
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
        
        state: {
            type: GraphQLString
        },
        
        locality: {
            type: GraphQLString,
        },
        
        isActive: {
            type: GraphQLBoolean,
        },

        requirements: {
            type: new GraphQLList(RequirementType),
        },

        status: {
            type: GraphQLString,
        },
        
        addedOn: {
            type: GraphQLFloat,
        },
        
    })
})

export default RequestType

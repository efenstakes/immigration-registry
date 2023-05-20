import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLFloat,
} from 'graphql'


// import models here

// types


const ResidenceType = new GraphQLObjectType({
    name: 'ResidenceType',
    description: 'Residence Type',
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
            type: GraphQLString,
        },
        
        addedOn: {
            type: GraphQLFloat,
        },
        
    })
})

export default ResidenceType

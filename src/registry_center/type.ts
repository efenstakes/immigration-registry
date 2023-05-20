import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLFloat,
} from 'graphql'


// import models here

// types


const RegistryCenterType = new GraphQLObjectType({
    name: 'RegistryCenterType',
    description: 'RegistryCenter Type',
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
        
        addedOn: {
            type: GraphQLFloat,
        },
        
    })
})

export default RegistryCenterType

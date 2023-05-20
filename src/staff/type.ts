import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLBoolean,
} from 'graphql'


// import models here

// types


const StaffType = new GraphQLObjectType({
    name: 'StaffType',
    description: 'Staff Type',
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
        
        id: {
            type: GraphQLString
        },
        
        role: {
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

export default StaffType

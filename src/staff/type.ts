import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
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
            type: GraphQLString,
        },
        
        addedOn: {
            type: GraphQLBoolean,
        },
        
    })
})

export default StaffType

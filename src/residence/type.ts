import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
} from 'graphql'
import StaffModel from '../staff/model'
import ResidenceOccupancyModel from '../residence_occupancy/model'


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

        staffId: {
            type: GraphQLID,
        },

        occupancy: {
            type: new GraphQLList(require("../residence_occupancy/type")),
            async resolve({ _id }, _args) {
                return await ResidenceOccupancyModel.find({ residenceId: _id }).lean()
            }
        },
        
    })
})

export default ResidenceType

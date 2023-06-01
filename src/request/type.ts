import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
} from 'graphql'
import ImmigrantModel from '../immigrant/model'
import StaffModel from '../staff/model'


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

        immigrantId: {
            type: GraphQLID,
        },

        staffId: {
            type: GraphQLID,
        },
        
        grounds: {
            type: GraphQLString
        },
        
        comments: {
            type: GraphQLString
        },
        
        requirements: {
            type: new GraphQLList(RequirementType),
        },

        status: {
            type: GraphQLString,
        },
        
        filedOn: {
            type: GraphQLFloat,
        },

        immigrant: {
            type: new GraphQLList(require("../immigrant/type")),
            async resolve({ immigrantId }, _args) {
                return await ImmigrantModel.findById(immigrantId).lean()
            }
        },

        staff: {
            type: new GraphQLList(require("../staff/type")),
            async resolve({ staffId }, _args) {
                return await StaffModel.findById(staffId).lean()
            }
        },
        
    })
})

export default RequestType

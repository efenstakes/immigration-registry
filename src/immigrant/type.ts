import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLList,
} from 'graphql'
import ResidenceOccupancyModel from '../residence_occupancy/model'
import RequestModel from '../request/model'


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

        entryDate: {
            type: GraphQLFloat,
        },

        centerOfRegistry: {
            type: GraphQLString,
        },
        
        staffId: {
            type: GraphQLID,
        },

        occupancyHistory: {
            type: new GraphQLList(require("../residence_occupancy/type")),
            async resolve({ _id }, _args) {
                return await ResidenceOccupancyModel.find({ immigrantId: _id }).lean()
            }
        },

        requestHistory: {
            type: new GraphQLList(require("../request/type")),
            async resolve({ _id }, _args) {
                return await RequestModel.find({ immigrantId: _id }).lean()
            }
        },
        
    })
})

export default ImmigrantType

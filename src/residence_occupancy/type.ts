import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLList,
} from 'graphql'
import ImmigrantModel from '../immigrant/model'
import ResidenceModel from '../residence/model'



const ResidenceOccupancyType = new GraphQLObjectType({
    name: 'ResidenceOccupancyTypeType',
    description: 'ResidenceOccupancy Type',
    fields: ()=> ({
        
        _id: {
            type: GraphQLID
        },
        
        residenceId: {
            type: GraphQLID
        },
        
        immigrantId: {
            type: GraphQLID,
        },
        
        admittedOn: {
            type: GraphQLFloat,
        },
        
        leftOn: {
            type: GraphQLFloat,
        },
        
        comments: {
            type: GraphQLString,
        },
        
        addedOn: {
            type: GraphQLFloat,
        },

        staffId: {
            type: GraphQLID,
        },

        immigrant: {
            type: new GraphQLList(require("../immigrant/type")),
            async resolve({ immigrantId }, _args) {
                return await ImmigrantModel.findById(immigrantId).lean()
            }
        },

        residence: {
            type: new GraphQLList(require("../residence/type")),
            async resolve({ residenceId }, _args) {
                return await ResidenceModel.findById(residenceId).lean()
            }
        },
        
    })
})

export default ResidenceOccupancyType

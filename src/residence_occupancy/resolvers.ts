import { GraphQLBoolean, GraphQLString } from "graphql"
import ResidenceOccupancyModel from "./model"
import ResidenceOccupancyType from "./type"



// Admit immigrant
export const admitImmigrant = {
    type: ResidenceOccupancyType,
    args: {
        immigrantId: {
            type: GraphQLString,
        },
        residenceId: {
            type: GraphQLString,
        },
        comments: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, args, { user }) {
        if( !user || !user.isActive ) return new Error('401')

        // collect data
        const data = {
            ...args,
            staffId: user._id,
            admittedOn: Date.now() 
        }
        let newOccupancy = await new ResidenceOccupancyModel(data).save()

        return newOccupancy
    }
}



// unadmin immigrant
export const unAdmitImmigrant = {
    type: GraphQLBoolean,
    args: {
        immigrantId: {
            type: GraphQLString,
        },
        residenceId: {
            type: GraphQLString,
        },
        comments: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { immigrantId, residenceId, comments }, { user }) {
        if( !user || !user.isActive ) return new Error('401')

        // collect data
        const data = {
            residenceId,
            comments,
            staffId: user._id,
            leftOn: Date.now() 
        }

        await ResidenceOccupancyModel.findByIdAndUpdate(immigrantId, data)

        return true
    }
}



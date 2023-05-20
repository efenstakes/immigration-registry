import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import ResidenceModel from "./model"
import ResidenceType from "./type"



// add 
export const addResidence = {
    type: ResidenceType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        state: {
            type: GraphQLString,
        },
        locality: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, args, { user }) {
        if( !user || !user.isActive || user.role != 'SUPERVISOR' ) return new Error('401')

        // collect data
        const data = {
            ...args,
            staffId: user._id,
            entryDate: Date.now() 
        }
        const newResidence = await new ResidenceModel(data).save()

        return newResidence
    }
}


// search
export const searchResidence = {
    type: new GraphQLList(ResidenceType),
    args: {
        state: {
            type: GraphQLString,
        },
        locality: {
            type: GraphQLString,
        },
        addedBy: {
            type: GraphQLString,
        },
        offset: {
            type: GraphQLInt,
        },
        limit: {
            type: GraphQLInt,
        },
    },
    async resolve(_context, { state, locality, addedBy, limit, offset }) {

        let query

        if( state ) {
            query = await ResidenceModel.where({ state })
        }
        if( locality ) {
            query = await ResidenceModel.where({ locality })
        }
        if( addedBy ) {
            query = await ResidenceModel.where({ addedBy })
        }

        return query.skip(offset).limit(limit).exec()
    }
}


// get details
export const getResidenceDetails = {
    type: ResidenceType,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { id }) {
        return await ResidenceModel.findById(id).lean()
    }
}


// deactivate
export const deactivateResidence = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user || !user.isActive || user.role != 'SUPERVISOR' ) return new Error('401')

        await ResidenceModel.findByIdAndUpdate(id, { isActive: false }) 

        return true
    }
}


// activate
export const activateResidence = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user || !user.isActive || user.role != 'SUPERVISOR' ) return new Error('401')

        await ResidenceModel.findByIdAndUpdate(id, { isActive: true }) 

        return true
    }
}


import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import RegistryModel from "./model"
import RegistryCenterType from "./type"



// add 
export const addRegistryCenter = {
    type: RegistryCenterType,
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
        const newCenter = await new RegistryModel(data).save()

        return newCenter
    }
}


// search
export const searchRegistryCenters = {
    type: new GraphQLList(RegistryCenterType),
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
            query = await RegistryModel.where({ state })
        }
        if( locality ) {
            query = await RegistryModel.where({ locality })
        }
        if( addedBy ) {
            query = await RegistryModel.where({ addedBy })
        }

        return query.skip(offset).limit(limit).exec()
    }
}


// get details
export const getRegistryCenterDetails = {
    type: RegistryCenterType,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { id }) {
        return await RegistryModel.findById(id).lean()
    }
}


// deactivate
export const deactivateRegistryCenter = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user || !user.isActive || user.role != 'SUPERVISOR' ) return new Error('401')

        await RegistryModel.findByIdAndUpdate(id, { isActive: false }) 

        return true
    }
}


// activate
export const activateRegistryCenter = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user || !user.isActive || user.role != 'SUPERVISOR' ) return new Error('401')

        await RegistryModel.findByIdAndUpdate(id, { isActive: true }) 

        return true
    }
}


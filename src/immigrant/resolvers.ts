import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import ImmigrantModel from "./model"
import ImmigrationModel from "./model"
import ImmigrantType from "./type"


// add 
export const addImmigrant = {
    type: ImmigrantType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        originId: {
            type: GraphQLString,
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
        centerOfRegistry: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, args, { user }) {
        if( !user || !user.isActive ) return new Error('401')

        // collect data
        const data = {
            ...args,
            staffId: user._id,
            entryDate: Date.now() 
        }
        const newImmigrant = await new ImmigrationModel(data).save()

        return newImmigrant
    }
}


// search
export const searchImmigrants = {
    type: new GraphQLList(ImmigrantType),
    args: {
        originCountry: {
            type: GraphQLString,
        },
        entryPoint: {
            type: GraphQLString,
        },
        centerOfRegistry: {
            type: GraphQLString,
        },
        staffId: {
            type: GraphQLString,
        },
        offset: {
            type: GraphQLInt,
        },
        limit: {
            type: GraphQLInt,
        },
    },
    async resolve(_context, { originCountry, entryPoint, centerOfRegistry, staffId, limit, offset }, { user }) {
        if( !user ) return new Error('401')

        let query

        if( originCountry ) {
            query = await ImmigrantModel.where({ originCountry })
        }
        if( entryPoint ) {
            query = await ImmigrantModel.where({ entryPoint })
        }
        if( centerOfRegistry ) {
            query = await ImmigrantModel.where({ centerOfRegistry })
        }
        if( staffId ) {
            query = await ImmigrantModel.where({ staffId })
        }

        return query.skip(offset).limit(limit).exec()
    }
}


// get details
export const getImmigrantDetails = {
    type: ImmigrantType,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user ) return new Error('401')

        const immigrant = await ImmigrantModel.findById(id).lean()

        return immigrant
    }
}



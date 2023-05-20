import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import RequestModel from "./model"
import ResidenceModel from "./model"
import RequestType from "./type"
import ResidenceType from "./type"



// add 
export const addRequest = {
    type: RequestType,
    args: {
        immigrant: {
            type: GraphQLString,
        },
        requirements: {
            type: new GraphQLNonNull(GraphQLString),
        },
        grounds: {
            type: GraphQLString,
        },
        comments: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { requirements, immigrant, grounds, comments }, { user }) {
        if( !user || !user.isActive ) return new Error('401')

        // collect data
        const data = {
            // use this if its just a nested object
            // requirements: requirements.map((r)=> {
            //     return {
            //         requirement: r,
            //         status: 'PENDING',
            //         comments: '',
            //     }
            // }),
            status: 'PENDING',
            immigrant,
            grounds,
            comments,
            staffId: user._id,
            filedOn: Date.now() 
        }
        let newRequest = await new RequestModel(data)
        requirements.forEach((requirement)=> {

            newRequest.requirements.push({
                requirement,
                status: 'PENDING',
                comments: '',
            })
        })
        newRequest = await newRequest.save()

        return newRequest
    }
}


// search
export const searchRequests = {
    type: new GraphQLList(RequestType),
    args: {
        immigrant: {
            type: GraphQLString,
        },
        grounds: {
            type: GraphQLString,
        },
        status: {
            type: GraphQLString,
        },
        offset: {
            type: GraphQLInt,
        },
        limit: {
            type: GraphQLInt,
        },
    },
    async resolve(_context, { immigrant, grounds, status, limit, offset }) {

        let query

        if( immigrant ) {
            query = await RequestModel.where({ immigrant })
        }
        if( grounds ) {
            query = await RequestModel.where({ grounds })
        }
        if( status ) {
            query = await RequestModel.where({ status })
        }

        return query.skip(offset).limit(limit).exec()
    }
}


// get details
export const getRequestDetails = {
    type: RequestType,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { id }) {
        return await RequestModel.findById(id).lean()
    }
}


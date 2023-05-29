import { GraphQLSchema, GraphQLObjectType, } from 'graphql'
import { addImmigrant, getImmigrantDetails, searchImmigrants } from './immigrant/resolvers'
import { activateRegistryCenter, addRegistryCenter, deactivateRegistryCenter, getRegistryCenterDetails, searchRegistryCenters } from './registry_center/resolvers'
import { addRequest, getRequestDetails, searchRequests } from './request/resolvers'
import { activateResidence, addResidence, deactivateResidence, getResidenceDetails, searchResidence } from './residence/resolvers'
import { activateStaff, addStaff, deactivateStaff, getStaffDetails, login } from './staff/resolvers'
import { admitImmigrant, unAdmitImmigrant } from './residence_occupancy/resolvers'



const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root query',
    fields: ()=> ({

        getStaffDetails,

        searchImmigrants,
        getImmigrantDetails,


        searchRegistryCenters,
        getRegistryCenterDetails,

        getResidenceDetails,
        searchResidence,

        // occupancy
        admitImmigrant,
        unAdmitImmigrant,

    })
})

const rootMutation = new GraphQLObjectType({
    name: 'RootQMutation',
    description: 'Root qMutation',
    fields: ()=> ({

        addStaff,
        login,
        deactivateStaff,
        activateStaff,

        addImmigrant,

        addRequest,
        searchRequests,
        getRequestDetails,


        addRegistryCenter,
        deactivateRegistryCenter,
        activateRegistryCenter,


        addResidence,
        deactivateResidence,
        activateResidence,

    })
})


export default new GraphQLSchema({ query: rootQuery, mutation: rootMutation })

import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLFloat,
} from 'graphql'



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
        }
        
    })
})

export default ResidenceOccupancyType

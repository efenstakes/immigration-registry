
// include external libraries
import mongoose, { Schema, } from 'mongoose'





const requirementSchema = new Schema({
    requirement: {
        type: String,
    },
    status: {
        type: String,
        enum: [ 'PENDING', 'FAILED', 'SUCCEEDED',  ]
    },
    comments: {
        type: String,
    },
    updatedOn: {
        type: Date,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Staff',
    },
})
const RequestSchema = new mongoose.Schema({

    immigrantId: {
        type: Schema.Types.ObjectId,
        ref: 'Immigrant',
    },
    
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'Staff',
    },
    
    grounds: {
        type: String,
    },
    
    comments: {
        type: String,
    },

    requirements: {
        type: [requirementSchema],
        default: []
    },

    status: {
        type: String,
    },

    filedOn: {
        type: Date,
        default: Date.now()
    },

}, {
    collation: { locale: 'en_US', strength: 2 }
})


const RequestModel = mongoose.model('Request', RequestSchema)
export default RequestModel

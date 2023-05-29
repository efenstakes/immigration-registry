
// include external libraries
import mongoose, { Schema, } from 'mongoose'


const residenceOccupancySchema = new Schema({

    residenceId: {
        type: Schema.Types.ObjectId,
        ref: 'Residence',
        required: true,
    },
    

    immigrantId: {
        type: Schema.Types.ObjectId,
        ref: 'Immigrant',
        required: true,
    },
    
    admittedOn: {
        type: Date,
        required: true,
    },

    leftOn: {
        type: Date,
    },

    comments: {
        type: String,
    },

    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'Staff',
    }

}, {
    collation: { locale: 'en_US', strength: 2 }
})


const ResidenceOccupancyModel = mongoose.model('ResidenceOccupancy', residenceOccupancySchema)
export default ResidenceOccupancyModel

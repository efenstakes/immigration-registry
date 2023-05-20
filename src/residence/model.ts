
// include external libraries
import mongoose, { Schema } from 'mongoose'


const residenceSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    },

    state: {
        type: String,
    },

    locality: {
        type: String,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    addedOn: {
        type: Date,
        default: Date.now()
    },

}, {
    collation: { locale: 'en_US', strength: 2 }
})


const ResidenceModel = mongoose.model('Residence', residenceSchema)
export default ResidenceModel

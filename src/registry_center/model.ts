
// include external libraries
import mongoose, { Schema } from 'mongoose'


const registryCenterSchema = new Schema({

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

    // staff that added it
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'Staff',
    },

    addedOn: {
        type: Date,
        default: Date.now()
    },

}, {
    collation: { locale: 'en_US', strength: 2 }
})


const RegistryModel = mongoose.model('RegistryCenter', registryCenterSchema)
export default RegistryModel

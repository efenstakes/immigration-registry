
// include external libraries
import mongoose, { Schema } from 'mongoose'



const immigrantSchema = new mongoose.Schema({

    // their name
    name: {
        type: String,
        unique: true,
        required: true,
    },
    
    // their email
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },

    // identification from their country of origin
    originId: {
        type: String,
    },
    
    originCountry: {
        type: Boolean,
        default: false,
    },
    
    // where they came in through
    entryPoint: {
        type: String,
    },
    
    // when they came in
    entryDate: {
        type: Date,
        default: Date.now()
    },

    // grounds for staying
    stayGround: {
        type: String,
        enum: [ 'POLITICAL', 'CLIMATE', 'SECURITY' ]
    },

    // center of registry
    centerOfRegistry: {
        type: Schema.Types.ObjectId,
        ref: 'RegistryCenter',
    },
    
}, {
    collation: { locale: 'en_US', strength: 2 }
})


const ImmigrationModel = mongoose.model('Immigration', immigrantSchema)
export default ImmigrationModel

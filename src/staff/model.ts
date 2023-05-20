
// include external libraries
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const staffSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
    },
    
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    id: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    
    role: {
        type: String,
        // RFS - reception facility supervisor
        // RFF - reception facility staff
        // TRFS - temporary residence facility supervisor
        // TRFF - reception facility supervisor
        enum: [ 'SUPERVISOR', 'ADMIN', 'RFS', 'RFF',, 'TRFS', 'TRFF', ]
    },

    isActive: {
        type: Boolean,
        default: false,
    },
    
    addedOn: {
        type: Date,
        default: Date.now()
    },

}, {
    collation: { locale: 'en_US', strength: 2 }
})


// hash password before creating account
staffSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)  
    next()
})


const StaffModel = mongoose.model('Staff', staffSchema)
export default StaffModel

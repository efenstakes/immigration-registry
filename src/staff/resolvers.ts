import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql"
import StaffModel from "./model"
import StaffType from "./type"
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/auth"

// add 
export const addStaff = {
    type: StaffType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLString,
        },
        id: {
            type: GraphQLString, 
        },
        role: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    async resolve(_context, args, { user }) {
        if( !user ) return new Error('401')

        // collect user data
        const accountData = {
            ...args,
            joined_on: Date.now() 
        }
        const newAccount = await new StaffModel(accountData).save()

        return newAccount
    }
}


// login
export const login = {
    type: StaffType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    async resolve(_context, { email, password }) {
        // check if staff exists 
        let account = await StaffModel.findOne({ email: email }).lean()

        // details were wrong
        if ( !account ) return new Error('400')

        // check if passwords match
        let match = await bcrypt.compare(password, account.password)

        // if passwords dont match return
        if ( !match ) return new Error('400')

        const accessToken = generateAccessToken(account)
        const refreshToken = generateRefreshToken(account)
        
        return {
            ...account,
            accessToken,
            refreshToken,
        }
    }
}


// get details
export const getStaffDetails = {
    type: StaffType,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user ) return new Error('401')

        const staff = await StaffModel.findOne({ id }).lean()

        return staff
    }
}


const isAbove = (me, target)=> {
    if( me == 'TRFF' ) return true

    if( [ 'ADMIN', 'SUPERVISOR' ].includes(target) && ![ 'ADMIN', 'SUPERVISOR' ].includes(target) ) {
        return true
    }

    return false
}

// deactivate
export const deactivateStaff = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user ) return new Error('401')


        const staff = await StaffModel.findById(id).lean()
        
        if( isAbove(user.role, staff.role) ) return new Error('401')

        await StaffModel.findByIdAndUpdate(id, { isActive: false }) 

        return true
    }
}


// activate
export const activateStaff = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: GraphQLString, 
        },
    },
    async resolve(_context, { id }, { user }) {
        if( !user ) return new Error('401')


        const staff = await StaffModel.findById(id).lean()
        
        if( isAbove(user.role, staff.role) ) return new Error('401')

        await StaffModel.findByIdAndUpdate(id, { isActive: true }) 

        return true
    }
}


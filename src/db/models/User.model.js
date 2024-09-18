import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [ /.+@.+\..+/, 'Email address is Invalid' ],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        profilePhoto: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre( "save", async function ( next )
{
    if ( !this.isModified( "password" ) ) return next();

    this.password = await bcrypt.hash( this.password, 10 )
    next()
} )

userSchema.methods.isPasswordCorrect = async function ( password )
{
    return await bcrypt.compare( password, this.password )
}

userSchema.methods.generateAccessToken = function ()
{
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function ()
{
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model( "User", userSchema )

export default User
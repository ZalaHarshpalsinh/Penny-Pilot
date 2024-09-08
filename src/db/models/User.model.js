import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxLength: 20,
            trim: true,
            lowercase: true,
            index: true,
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
        profileImage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model( "User", userSchema )

export default User
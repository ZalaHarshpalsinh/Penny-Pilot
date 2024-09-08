import mongoose, { Schema } from 'mongoose';

const dummyFriendSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        maxLength: 20,
    },
    email: {
        type: String,
        match: [ /.+@.+\..+/, 'Email is invalid' ]
    },
    creator: [ {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    } ],
} );

export const DummyFriend = mongoose.model( 'DummyFriend', dummyFriendSchema );
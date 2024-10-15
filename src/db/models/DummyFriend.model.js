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
    amount: {
        type: Number,
        required: true,
    },
    creator: [ {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    } ],
} );

const DummyFriend = mongoose.model( 'DummyFriend', dummyFriendSchema );

export default DummyFriend
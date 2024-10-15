import mongoose, { Schema } from 'mongoose';

const moneyPoolSchema = new Schema( {
    name: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        maxLength: 100,
    },
    icon: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
} );

const MoneyPool = mongoose.model( 'MoneyPool', moneyPoolSchema );

export default MoneyPool
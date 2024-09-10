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
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [ 0, "Amount can not be negative" ],
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
} );

const MoneyPool = mongoose.model( 'MoneyPool', moneyPoolSchema );

export default MoneyPool
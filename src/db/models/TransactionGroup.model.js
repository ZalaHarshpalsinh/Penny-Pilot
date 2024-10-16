import mongoose, { Schema } from 'mongoose';

const transactionGroupSchema = new Schema( {
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
    transactionType: {
        type: String,
        enum: [ 'Income', 'Expense' ],
        required: true,
    },
    icon: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
} );

const TransactionGroup = mongoose.model( 'TransactionGroup', transactionGroupSchema );

export default TransactionGroup
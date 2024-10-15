import mongoose, { Schema } from 'mongoose';

const transactionCategorySchema = new Schema( {
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
        ref: 'User'
    },
} );

const TransactionCategory = mongoose.model( 'TransactionCategory', transactionCategorySchema );

export default TransactionCategory
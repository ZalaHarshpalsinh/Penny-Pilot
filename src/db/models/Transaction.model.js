import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema( {
    title: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
    }
    ,
    description: {
        type: String,
        required: true,
        maxLength: 100,
    },
    type: {
        type: String,
        enum: [ 'Income', 'Expense', "Borrow", "Lend", "Transfer" ],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [ 0, "Amount can not be negative" ],
    },
    transactionDateTime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toMoneyPool: {
        type: Schema.Types.ObjectId,
        ref: 'MoneyPool',
    },
    fromMoneyPool: {
        type: Schema.Types.ObjectId,
        ref: 'MoneyPool',
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TransactionCategory',
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'TransactionGroup',
    },
    // friend: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // },
    dummyFriend: {
        type: mongoose.Types.ObjectId,
        ref: 'DummyFriend'
    }
} )

const Transaction = mongoose.model( "Transaction", transactionSchema )

export default Transaction
import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from "../utils/index.js"
import { Transaction } from "../db/index.js"

const registerTransaction = asyncHandler( async ( req, res ) =>
{
    const { title, description, type, amount, transactionDateTime, category, group, toMoneyPool, fromMoneyPool, dummyFriend } = req.body

    const newTransaction = new Transaction( {
        title,
        description,
        type,
        amount: Number( amount ),
        transactionDateTime: transactionDateTime || Date.now(),
        user: req.user._id,
        toMoneyPool,
        fromMoneyPool,
        category,
        group,
        dummyFriend,
    } );

    // Save the transaction to the database
    await newTransaction.save();

    res.status( 201 ).json(
        new ApiResponse( 201, newTransaction, "Transaction added successfully" )
    )
} )

const getAllTransactions = asyncHandler( async ( req, res ) =>
{
    const transactions = await Transaction.find( { user: req.user._id } )
        .populate( 'category' )
        .populate( 'group' )
        .populate( 'toMoneyPool' )
        .populate( 'fromMoneyPool' )
        .populate( 'dummyFriend' );

    if ( transactions.length === 0 )
    {
        throw new ApiError( 404, "No transactions found for this user" );
    }

    res.status( 200 ).json( new ApiResponse( 200, transactions, "Success" ) )
} )

const getSingleTransaction = asyncHandler( async ( req, res ) =>
{
    const transactionId = req.params._id

    const transaction = await Transaction.findById( transactionId )
        .populate( 'category' )
        .populate( 'group' )
        .populate( 'toMoneyPool' )
        .populate( 'fromMoneyPool' )
        .populate( 'dummyFriend' );

    if ( transaction.user !== req.user._id )
    {
        throw new ApiError( 403, "Not allowed to access this transaction" );
    }

    res.status( 200 ).json( new ApiResponse( 200, transaction, "Success" ) )

} )

const updateTransaction = asyncHandler( async ( req, res ) =>
{
    const transactionId = req.params.id;

    // Get the fields to update from the request body
    const updates = req.body;

    // Find the transaction by ID and update it with the provided fields
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        { $set: updates }, // Use $set to only update the specified fields
        { new: true, runValidators: true } // Return the updated document, validate updates
    )
        .populate( 'category' )
        .populate( 'group' )
        .populate( 'toMoneyPool' )
        .populate( 'fromMoneyPool' )
        .populate( 'dummyFriend' );

    res.status( 200 ).json( new ApiResponse( 200, updateTransaction, "Success" ) )
} )

const deleteTransaction = asyncHandler( async ( req, res ) =>
{
    const transactionId = req.params.id;

    // Find the transaction by ID and delete it
    const deletedTransaction = await Transaction.findByIdAndDelete( transactionId );

    res.status( 200 ).json( new ApiResponse( 200, {}, "Success" ) )
} )

export
{
    registerTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
}


import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from "../utils/index.js"
import { DummyFriend, MoneyPool, Transaction, TransactionCategory, TransactionGroup } from "../db/index.js"

const registerTransaction = asyncHandler( async ( req, res ) =>
{
    const { title, description, type, amount, transactionDateTime, category, group, toMoneyPool, fromMoneyPool, dummyFriend } = req.body

    const transaction = new Transaction( {
        title, description, type, amount, transactionDateTime
    } )

    category = await TransactionCategory.findById( category );
    group = await TransactionGroup.findById( group );
    toMoneyPool = await MoneyPool.findById( toMoneyPool );
    fromMoneyPool = await MoneyPool.findById( fromMoneyPool );
    dummyFriend = await DummyFriend.findById( dummyFriend );

    if ( type == "Income" )
    {
        transaction.category = category._id;
        if ( group ) transaction.group = group._id;
        transaction.toMoneyPool = toMoneyPool._id;
        toMoneyPool.currentAmount += transaction.amount;
        await toMoneyPool.save()
    }
    else if ( type == "Expense" )
    {
        transaction.category = category._id;
        if ( group ) transaction.group = group._id;

        if ( fromMoneyPool )
        {
            transaction.fromMoneyPool = fromMoneyPool._id;
            fromMoneyPool.currentAmount -= transaction.amount;
            await fromMoneyPool.save()
        }
        else
        {
            transaction.dummyFriend = dummyFriend._id
            dummyFriend.amount -= transaction.amount
            await dummyFriend.save()
        }
    }
    else if ( type == "Lend" )
    {
        transaction.dummyFriend = dummyFriend._id;
        dummyFriend.amount += transaction.amount
        transaction.fromMoneyPool = fromMoneyPool._id;
        fromMoneyPool.currentAmount -= transaction.amount;
        await fromMoneyPool.save()
        await dummyFriend.save()
    }
    else if ( type == "Borrowed" )
    {
        transaction.dummyFriend = dummyFriend._id;
        dummyFriend.amount -= transaction.amount
        transaction.toMoneyPool = toMoneyPool._id;
        toMoneyPool.currentAmount += transaction.amount;

        await dummyFriend.save()
        await toMoneyPool.save()
    }
    else if ( type == "Transfer" )
    {
        transaction.fromMoneyPool = fromMoneyPool._id;
        fromMoneyPool.currentAmount -= transaction.amount;
        transaction.toMoneyPool = toMoneyPool._id;
        toMoneyPool.currentAmount += transaction.amount;

        await fromMoneyPool.save()
        await toMoneyPool.save()
    }

    await transaction.save()

    res.status( 201 ).json(
        new ApiResponse( 201, transaction, "Transaction added successfully" )
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


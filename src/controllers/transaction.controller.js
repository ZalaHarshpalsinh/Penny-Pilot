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

const registerIncomeTransaction = asyncHandler( async ( req, res ) =>
{
    let { title, description, amount, transactionDateTime, category, group, moneyPool } = req.body

    console.log( "This is income data:", req.body );

    const transaction = new Transaction( {
        title, description, type: "Income", amount, transactionDateTime, user: req.user._id
    } )

    category = await TransactionCategory.findById( category );
    if ( group ) group = await TransactionGroup.findById( group );
    moneyPool = await MoneyPool.findById( moneyPool );

    transaction.category = category._id;
    if ( group ) transaction.group = group._id;
    transaction.toMoneyPool = moneyPool._id;
    moneyPool.amount += transaction.amount;
    await moneyPool.save()

    await transaction.save()

    res.status( 201 ).json(
        new ApiResponse( 201, transaction, "Transaction added successfully" )
    )
} )

const registerExpenseTransaction = asyncHandler( async ( req, res ) =>
{
    let { title, description, amount, transactionDateTime, category, group, moneyPool, paidBy } = req.body

    const transaction = new Transaction( {
        title, description, type: "Expense", amount, transactionDateTime, user: req.user._id
    } )

    category = await TransactionCategory.findById( category );
    if ( group ) group = await TransactionGroup.findById( group );
    if ( moneyPool ) moneyPool = await MoneyPool.findById( moneyPool );
    if ( paidBy ) paidBy = await DummyFriend.findById( paidBy );

    transaction.category = category._id;
    if ( group ) transaction.group = group._id;

    if ( moneyPool )
    {
        transaction.moneyPool = moneyPool._id;
        moneyPool.amount -= transaction.amount;
        await moneyPool.save()
    }
    else
    {
        transaction.paidBy = paidBy._id
        paidBy.amount -= transaction.amount
        await paidBy.save()
    }

    await transaction.save()

    res.status( 201 ).json(
        new ApiResponse( 201, transaction, "Transaction added successfully" )
    )
} )

const registerLendTransaction = asyncHandler( async ( req, res ) =>
{
    let { title, description, amount, transactionDateTime, moneyPool, dummyFriend } = req.body

    const transaction = new Transaction( {
        title, description, type: "Lend", amount, transactionDateTime, user: req.user._id
    } )

    moneyPool = await MoneyPool.findById( moneyPool );
    dummyFriend = await DummyFriend.findById( dummyFriend );

    transaction.dummyFriend = dummyFriend._id;
    dummyFriend.amount += transaction.amount
    transaction.fromMoneyPool = moneyPool._id;
    moneyPool.amount -= transaction.amount;
    await moneyPool.save()
    await dummyFriend.save()

    await transaction.save()

    res.status( 201 ).json(
        new ApiResponse( 201, transaction, "Transaction added successfully" )
    )
} )

const registerBorrowTransaction = asyncHandler( async ( req, res ) =>
{
    let { title, description, amount, transactionDateTime, moneyPool, dummyFriend } = req.body

    const transaction = new Transaction( {
        title, description, type: "Borrow", amount, transactionDateTime, user: req.user._id
    } )

    moneyPool = await MoneyPool.findById( moneyPool );
    dummyFriend = await DummyFriend.findById( dummyFriend );

    transaction.dummyFriend = dummyFriend._id;
    dummyFriend.amount -= transaction.amount
    transaction.toMoneyPool = moneyPool._id;
    moneyPool.amount += transaction.amount;
    await moneyPool.save()
    await dummyFriend.save()

    await transaction.save()

    res.status( 201 ).json(
        new ApiResponse( 201, transaction, "Transaction added successfully" )
    )
} )

const registerTransferTransaction = asyncHandler( async ( req, res ) =>
{
    let { title, description, amount, transactionDateTime, fromMoneyPool, toMoneyPool } = req.body

    const transaction = new Transaction( {
        title, description, type: "Transfer", amount, transactionDateTime, user: req.user._id
    } )

    fromMoneyPool = await MoneyPool.findById( fromMoneyPool );
    toMoneyPool = await MoneyPool.findById( toMoneyPool );

    transaction.fromMoneyPool = fromMoneyPool._id;
    fromMoneyPool.amount -= transaction.amount
    transaction.toMoneyPool = toMoneyPool._id;
    toMoneyPool.amount += transaction.amount;
    await fromMoneyPool.save()
    await toMoneyPool.save()

    await transaction.save()

    res.status( 201 ).json(
        new ApiResponse( 201, transaction, "Transaction added successfully" )
    )
} )

const getAllTransactions = asyncHandler( async ( req, res ) =>
{
    const userId = req.user._id;
    const { month, year } = req.query;

    try
    {
        // Parse month and year as numbers
        const monthInt = parseInt( month );
        const yearInt = parseInt( year );

        // Construct the start and end date range for the given month and year
        const startDate = new Date( yearInt, monthInt - 1, 1 ); // start of the month
        const endDate = new Date( yearInt, monthInt, 1 ); // start of the next month

        // Find transactions for the given user, within the specified date range, and sort by date (most recent first)
        const transactions = await Transaction.find( {
            user: userId,
            transactionDateTime: {
                $gte: startDate, // greater than or equal to startDate
                $lt: endDate,    // less than endDate
            }
        } )
            .populate( 'category' )  // Populate category, user, money pools if needed
            .populate( 'toMoneyPool' )
            .populate( 'fromMoneyPool' )
            .populate( 'group' )
            .populate( 'dummyFriend' )
            .populate( 'paidBy' )
            .sort( { transactionDateTime: -1 } ); // sort by most recent first

        res.status( 200 ).json( new ApiResponse( 200, transactions, "Success" ) )
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: "Server error" } );
    }

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
    registerIncomeTransaction,
    registerExpenseTransaction,
    registerLendTransaction,
    registerBorrowTransaction,
    registerTransferTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
}


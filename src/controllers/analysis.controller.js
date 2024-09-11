import { Transaction } from "../db/index.js";

const incomeCat = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Income" } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: 'Server Error' } );
    }
};

const incomeTransactionGroupWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Income" } },
            { $group: { _id: "$group", totalAmount: { $sum: "$amount" } } },
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

const incomeMoneyPoolWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Income" } },
            { $group: { _id: "$toMoneyPool", totalAmount: { $sum: "$amount" } } },
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
}

//Exepense 1,2,3
const expenseCat = async ( req, res ) =>
{
    try
    {

        const result = await Transaction.aggregate( [
            { $match: { type: "Expense" } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );

        // const totalSum = transactions.reduce((acc, curr) => acc + curr.totalAmount, 0);


        // const result = transactions.map(transaction => {
        //     return {
        //         category: transaction.category,
        //         totalAmount: transaction.totalAmount,
        //         percentage: ((transaction.totalAmount / totalSum) * 100).toFixed(2) 
        //     };
        // });

        res.status( 200 ).json( result );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: 'Server Error' } );
    }
};

const expenseTransactionGroupWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Expense" } },
            { $group: { _id: "$group", totalAmount: { $sum: "$amount" } } },
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

const expenseMoneyPoolWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Expense" } },
            { $group: { _id: "$toMoneyPool", totalAmount: { $sum: "$amount" } } },
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
}

// LENT -1,2,3
const lentCategoryWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Lend" } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

const lentFriendWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Lend" } },
            { $group: { _id: "$friend", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

const lentMoneyPoolWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Lend" } },
            { $group: { _id: "$toMoneyPool", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};


// BORROWED -1,2,3
const borrowedCategoryWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Borrow" } },
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

const borrowedFriendWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Borrow" } },
            { $group: { _id: "$friend", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

const borrowedMoneyPoolWise = async ( req, res ) =>
{
    try
    {
        const result = await Transaction.aggregate( [
            { $match: { type: "Borrow" } },
            { $group: { _id: "$fromMoneyPool", totalAmount: { $sum: "$amount" } } },
            { $sort: { totalAmount: -1 } }
        ] );
        res.status( 200 ).json( result );
    } catch ( err )
    {
        res.status( 500 ).json( { error: "Server Error" } );
    }
};

export
{
    incomeCat,
    incomeTransactionGroupWise,
    incomeMoneyPoolWise,
    expenseCat,
    expenseTransactionGroupWise,
    expenseMoneyPoolWise,
    lentCategoryWise,
    lentFriendWise,
    lentMoneyPoolWise,
    borrowedCategoryWise,
    borrowedFriendWise,
    borrowedMoneyPoolWise,
}

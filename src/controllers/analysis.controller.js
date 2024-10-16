import { Transaction } from "../db/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

const getIncomeAnalysisCategoryWise = asyncHandler( async ( req, res ) =>
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
        const incomes = await Transaction.aggregate( [
            {
                $match: {
                    user: userId,
                    type: 'Income',
                    transactionDateTime: { $gte: startDate, $lt: endDate },
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }  // Sum the amounts for each category
                }
            },
            {
                $lookup: {
                    from: "transactioncategories", // Collection for categories
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: "$categoryInfo"
            },
            {
                $project: {
                    _id: 0,
                    categoryName: "$categoryInfo.name",
                    totalAmount: 1
                }
            }
        ] );

        res.status( 200 ).json( new ApiResponse( 200, incomes, "Success" ) )
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: "Server error" } );
    }
} )

const getExpenseAnalysisCategoryWise = asyncHandler( async ( req, res ) =>
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
        const expenses = await Transaction.aggregate( [
            {
                $match: {
                    user: userId,
                    type: 'Expense',
                    transactionDateTime: { $gte: startDate, $lt: endDate },
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }  // Sum the amounts for each category
                }
            },
            {
                $lookup: {
                    from: "transactioncategories", // Collection for categories
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: "$categoryInfo"
            },
            {
                $project: {
                    _id: 0,
                    categoryName: "$categoryInfo.name",
                    totalAmount: 1
                }
            }
        ] );

        res.status( 200 ).json( new ApiResponse( 200, expenses, "Success" ) )
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: "Server error" } );
    }
} )

export
{
    getIncomeAnalysisCategoryWise,
    getExpenseAnalysisCategoryWise,
}

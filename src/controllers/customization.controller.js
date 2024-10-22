import { MoneyPool, DummyFriend, TransactionGroup, TransactionCategory, Transaction } from "../db/index.js";
import { ApiError, ApiResponse, asyncHandler, uploadOnCloudinary } from "../utils/index.js";

const createMoneyPool = asyncHandler( async ( req, res ) =>
{
    const { name, description } = req.body;

    const moneyPool = new MoneyPool( {
        name, description,
        amount: 0,
        creator: req.user._id
    } );

    const iconFilePath = req.file?.path;
    const iconFile = await uploadOnCloudinary( iconFilePath );

    if ( iconFilePath )
    {
        if ( !iconFile )
        {
            throw new ApiError( 500, "Error while uploading icon file" );
        }
        else
        {
            moneyPool.icon = iconFile.url
        }
    }

    await moneyPool.save();

    res.status( 201 ).json( new ApiResponse( 201, moneyPool, "Money pool created successfully" ) );
} )

const getMoneyPools = asyncHandler( async ( req, res ) =>
{
    const moneyPools = await MoneyPool.find( { creator: req.user._id } )

    res.status( 200 ).json( new ApiResponse( 200, moneyPools, "Request served successfully" ) )
} )

const updateMoneyPool = asyncHandler( async ( req, res ) =>
{
    const moneyPoolId = req.params.id
    const { name, description } = req.body

    const moneyPool = await MoneyPool.findOne( {
        _id: moneyPoolId,
        creator: req.user._id,
    } )

    if ( !moneyPool )
    {
        throw new ApiError( 404, "Money pool not found" )
    }

    moneyPool.name = name
    moneyPool.description = description

    const iconFilePath = req.file?.path;
    const iconFile = await uploadOnCloudinary( iconFilePath );

    if ( iconFilePath )
    {
        if ( !iconFile )
        {
            throw new ApiError( 500, "Error while uploading icon file" );
        }
        else
        {
            moneyPool.icon = iconFile.url
        }
    }

    await moneyPool.save()

    res.status( 200 ).json( new ApiResponse( 200, moneyPool, "Success" ) )
} )

const deleteMoneyPool = asyncHandler( async ( req, res ) =>
{
    const moneyPoolId = req.params.id

    const moneyPool = await MoneyPool.findOne( {
        _id: moneyPoolId,
        creator: req.user._id,
    } )

    if ( !moneyPool )
    {
        throw new ApiError( 404, "Money pool not found" )
    }

    const tranctions = await Transaction.find( {
        $or: [ { fromMoneyPool: moneyPoolId }, { toMoneyPool: moneyPoolId } ]
    } )

    if ( tranctions.length > 0 )
    {
        throw new ApiError( 400, "Can't delete this money pool, it is involved with current transactions." );
    }

    await moneyPool.deleteOne()

    res.status( 200 ).json( new ApiResponse( 200, {}, "Success" ) )
} )

const createDummyFriend = asyncHandler( async ( req, res ) =>
{
    const { name, email } = req.body;

    console.log( name, email )

    const dummyFriend = new DummyFriend( {
        name, email, amount: 0,
        creator: req.user._id,
    } );

    await dummyFriend.save();

    res.status( 201 ).json( new ApiResponse( 201, dummyFriend, "Dummy friend created successfully" ) );
} )

const getDummyFriends = asyncHandler( async ( req, res ) =>
{
    const dummyFriends = await DummyFriend.find( { creator: req.user._id } )

    res.status( 200 ).json( new ApiResponse( 200, dummyFriends, "Request served successfully" ) )
} )

const updateDummyFriend = asyncHandler( async ( req, res ) =>
{
    const dummyFriendId = req.params.id
    const { name, email } = req.body

    const dummyFriend = await DummyFriend.findOne( {
        _id: dummyFriendId,
        creator: req.user._id,
    } )

    if ( !dummyFriend )
    {
        throw new ApiError( 404, "Money pool not found" )
    }

    dummyFriend.name = name
    dummyFriend.email = email

    await dummyFriend.save()

    res.status( 200 ).json( new ApiResponse( 200, dummyFriend, "Success" ) )
} )

const deleteDummyFriend = asyncHandler( async ( req, res ) =>
{
    const dummyFriendId = req.params.id

    const dummyFriend = await DummyFriend.findOne( {
        _id: dummyFriendId,
        creator: req.user._id,
    } )

    if ( !dummyFriend )
    {
        throw new ApiError( 404, "Money pool not found" )
    }

    const tranctions = await Transaction.find( {
        $or: [ { dummyFriend: dummyFriendId }, { paidBy: dummyFriendId } ]
    } )

    if ( tranctions.length > 0 )
    {
        throw new ApiError( 400, "Can't delete this friend, it is involved with current transactions." );
    }

    await dummyFriend.deleteOne()

    res.status( 200 ).json( new ApiResponse( 200, {}, "Success" ) )
} )


// tranction -Cat 1,2,3,4
const createTransactionCategory = asyncHandler( async ( req, res ) =>
{
    const { name, description, transactionType } = req.body;

    const tranctionCategory = new TransactionCategory( {
        name, description, transactionType,
        creator: req.user._id
    } );

    const iconFilePath = req.file?.path;
    const iconFile = await uploadOnCloudinary( iconFilePath );

    if ( iconFilePath )
    {
        if ( !iconFile )
        {
            throw new ApiError( 500, "Error while uploading icon file" );
        }
        else
        {
            tranctionCategory.icon = iconFile.url
        }
    }


    await tranctionCategory.save();

    res.status( 201 ).json( new ApiResponse( 201, tranctionCategory, "Created successfully" ) );
} )

const getTransactionCategories = asyncHandler( async ( req, res ) =>
{
    const transactionCategories = await TransactionCategory.find( {
        $or: [
            { creator: { $eq: null } }, { creator: req.user._id }
        ]
    } )

    console.log( transactionCategories );

    res.status( 200 ).json( new ApiResponse( 200, transactionCategories, "Request served successfully" ) )
} )

const updateTransactionCategory = asyncHandler( async ( req, res ) =>
{
    const tranctionCategoryId = req.params.id
    const { name, description } = req.body

    const transactionCategory = await TransactionCategory.findOne( {
        _id: tranctionCategoryId,
        creator: req.user._id,
    } )

    if ( !transactionCategory )
    {
        throw new ApiError( 404, "Category not found" )
    }

    transactionCategory.name = name
    transactionCategory.description = description

    const iconFilePath = req.file?.path;
    const iconFile = await uploadOnCloudinary( iconFilePath );

    if ( iconFilePath )
    {
        if ( !iconFile )
        {
            throw new ApiError( 500, "Error while uploading icon file" );
        }
        else
        {
            transactionCategory.icon = iconFile.url
        }
    }

    await transactionCategory.save()

    res.status( 200 ).json( new ApiResponse( 200, transactionCategory, "Success" ) )
} )

const deleteTransactionCategory = asyncHandler( async ( req, res ) =>
{
    const tranctionCategoryId = req.params.id

    const tranctionCategory = await TransactionCategory.findOne( {
        _id: tranctionCategoryId,
        creator: req.user._id,
    } )

    if ( !tranctionCategory )
    {
        throw new ApiError( 404, "Money pool not found" )
    }

    await tranctionCategory.remove()

    res.status( 200 ).json( new ApiResponse( 200, {}, "Success" ) )
} )


// Tranction-group 1,2,3,4
const createTransactionGroup = asyncHandler( async ( req, res ) =>
{
    const { name, description, transactionType } = req.body;

    const transactionGroup = new TransactionGroup( {
        name, description, transactionType,
        creator: req.user._id
    } );

    const iconFilePath = req.file?.path;
    const iconFile = await uploadOnCloudinary( iconFilePath );

    if ( iconFilePath )
    {
        if ( !iconFile )
        {
            throw new ApiError( 500, "Error while uploading icon file" );
        }
        else
        {
            transactionGroup.icon = iconFile.url
        }
    }

    await transactionGroup.save();

    res.status( 201 ).json( new ApiResponse( 201, transactionGroup, "Created successfully" ) );
} )

const getTransactionGroups = asyncHandler( async ( req, res ) =>
{
    const transactionGroups = await TransactionGroup.find( { creator: req.user._id } )

    res.status( 200 ).json( new ApiResponse( 200, transactionGroups, "Request served successfully" ) )
} )

const updateTransactionGroup = asyncHandler( async ( req, res ) =>
{
    const transactionGroupId = req.params.id
    const { name, description } = req.body

    const transactionGroup = await TransactionGroup.findOne( {
        _id: transactionGroupId,
        creator: req.user._id,
    } )

    if ( !transactionGroup )
    {
        throw new ApiError( 404, "Group not found" )
    }

    transactionGroup.name = name
    transactionGroup.description = description

    const iconFilePath = req.file?.path;
    const iconFile = await uploadOnCloudinary( iconFilePath );

    if ( iconFilePath )
    {
        if ( !iconFile )
        {
            throw new ApiError( 500, "Error while uploading icon file" );
        }
        else
        {
            transactionGroup.icon = iconFile.url
        }
    }

    await transactionGroup.save()

    res.status( 200 ).json( new ApiResponse( 200, transactionGroup, "Success" ) )
} )

const deleteTransactionGroup = asyncHandler( async ( req, res ) =>
{
    const transactionGroupId = req.params.id

    const transactionGroup = await TransactionGroup.findOne( {
        _id: transactionGroupId,
        creator: req.user._id,
    } )

    if ( !transactionGroup )
    {
        throw new ApiError( 404, "Group not found" )
    }

    await transactionGroup.remove()

    res.status( 200 ).json( new ApiResponse( 200, {}, "Success" ) )
} )

export
{
    createMoneyPool,
    getMoneyPools,
    updateMoneyPool,
    deleteMoneyPool,
    createDummyFriend,
    getDummyFriends,
    updateDummyFriend,
    deleteDummyFriend,
    createTransactionCategory,
    getTransactionCategories,
    updateTransactionCategory,
    deleteTransactionCategory,
    createTransactionGroup,
    getTransactionGroups,
    updateTransactionGroup,
    deleteTransactionGroup,
}
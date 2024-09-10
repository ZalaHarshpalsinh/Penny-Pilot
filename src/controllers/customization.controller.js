import { MoneyPool, DummyFriend, TransactionGroup, TransactionCategory } from "../db/index.js";

const createMoneyPool = async ( req, res ) =>
{
    try
    {
        const moneyPool = new MoneyPool( req.body );
        await moneyPool.save();
        res.status( 201 ).json( moneyPool );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const getMoneyPools = async ( req, res ) =>
{
    try
    {
        const moneyPools = await MoneyPool.find();
        res.status( 200 ).json( moneyPools );
    } catch ( err )
    {
        res.status( 500 ).json( { error: 'Server Error' } );
    }
};

const updateMoneyPool = async ( req, res ) =>
{
    try
    {
        const moneyPool = await MoneyPool.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },//if data presents than change
            { new: true, runValidators: true }
        );
        if ( !moneyPool )
        {
            return res.status( 404 ).json( { error: 'Money Pool not found' } );
        }
        res.status( 200 ).json( moneyPool );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const deleteMoneyPool = async ( req, res ) =>
{
    try
    {
        const moneyPool = await MoneyPool.findByIdAndDelete( req.params.id );
        if ( !moneyPool )
        {
            return res.status( 404 ).json( { error: 'Money Pool not found' } );
        }
        res.status( 204 ).send();
    } catch ( err )
    {
        res.status( 500 ).json( { error: 'Server Error' } );
    }
};

const createDummyFriend = async ( req, res ) =>
{
    try
    {
        const { name, email, creator } = req.body;
        const existingDummyFriend = await DummyFriend.findOne( { name } );

        if ( existingDummyFriend )
        {
            return res.status( 400 ).json( { error: 'A DummyFriend with this name already exists. Please choose a different name.' } );
        }
        const newDummyFriend = new DummyFriend( req.body );

        await newDummyFriend.save();
        res.status( 201 ).json( newDummyFriend );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const getDummyFriends = async ( req, res ) =>
{
    try
    {
        const dummyFriends = await DummyFriend.find() // .populate('creator');
        res.status( 200 ).json( dummyFriends );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const updateDummyFriend = async ( req, res ) =>
{
    try
    {
        // const updates = req.body;
        const updatedDummyFriend = await DummyFriend.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if ( !updatedDummyFriend )
        {
            return res.status( 404 ).json( { error: 'DummyFriend not found' } );
        }

        res.status( 200 ).json( updatedDummyFriend );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const deleteDummyFriend = async ( req, res ) =>
{
    try
    {
        const deletedDummyFriend = await DummyFriend.findByIdAndDelete( req.params.id );

        if ( !deletedDummyFriend )
        {
            return res.status( 404 ).json( { error: 'DummyFriend not found' } );
        }

        res.status( 200 ).json( { message: 'DummyFriend deleted successfully' } );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

// tranction -Cat 1,2,3,4
const createTransactionCategory = async ( req, res ) =>
{
    try
    {
        const { name, transactionType } = req.body;
        const existingCategory = await TransactionCategory.findOne( { name, transactionType } );

        if ( existingCategory )
        {
            return res.status( 400 ).json( { error: 'A Transaction Category with this name and type already exists.' } );
        }

        const newCategory = new TransactionCategory( req.body );
        await newCategory.save();
        res.status( 201 ).json( newCategory );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const getTransactionCategories = async ( req, res ) =>
{
    try
    {
        const categories = await TransactionCategory.find()// populate('creator');
        res.status( 200 ).json( categories );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const updateTransactionCategory = async ( req, res ) =>
{
    try
    {
        const updates = req.body;

        const updatedCategory = await TransactionCategory.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if ( !updatedCategory )
        {
            return res.status( 404 ).json( { error: 'Transaction Category not found' } );
        }

        res.status( 200 ).json( updatedCategory );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const deleteTransactionCategory = async ( req, res ) =>
{
    try
    {
        const deletedCategory = await TransactionCategory.findByIdAndDelete( req.params.id );

        if ( !deletedCategory )
        {
            return res.status( 404 ).json( { error: 'Transaction Category not found' } );
        }

        res.status( 200 ).json( { message: 'Transaction Category deleted successfully' } );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};
// Tranction-group 1,2,3,4
const createTransactionGroup = async ( req, res ) =>
{
    try
    {
        const { name, icon, description, transactionType, creator } = req.body;

        const existingGroup = await TransactionGroup.findOne( { name, transactionType } );

        if ( existingGroup )
        {
            return res.status( 400 ).json( { error: 'A Transaction Group with this name and type already exists.' } );
        }
        const newGroup = new TransactionGroup( { name, icon, description, transactionType, creator } );
        await newGroup.save();
        res.status( 201 ).json( newGroup );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const getTransactionGroups = async ( req, res ) =>
{
    try
    {
        const groups = await TransactionGroup.find() // .populate('creator');
        res.status( 200 ).json( groups );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const updateTransactionGroup = async ( req, res ) =>
{
    try
    {
        const updates = req.body;

        const updatedGroup = await TransactionGroup.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if ( !updatedGroup )
        {
            return res.status( 404 ).json( { error: 'Transaction Group not found' } );
        }

        res.status( 200 ).json( updatedGroup );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

const deleteTransactionGroup = async ( req, res ) =>
{
    try
    {
        const deletedGroup = await TransactionGroup.findByIdAndDelete( req.params.id );

        if ( !deletedGroup )
        {
            return res.status( 404 ).json( { error: 'Transaction Group not found' } );
        }

        res.status( 200 ).json( { message: 'Transaction Group deleted successfully' } );
    } catch ( err )
    {
        res.status( 400 ).json( { error: err.message } );
    }
};

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
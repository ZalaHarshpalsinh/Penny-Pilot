import { Router } from "express";
import
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
} from "../controllers/customization.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post( "/money-pool", verifyJwt, createMoneyPool )
router.get( "/money-pools", verifyJwt, getMoneyPools )
router.patch( "/money-pool/:id", verifyJwt, updateMoneyPool )
router.delete( "/money-pool/:id", verifyJwt, deleteMoneyPool )

router.post( "/dummy-friend", verifyJwt, createDummyFriend )
router.get( "/dummy-friends", verifyJwt, getDummyFriends )
router.patch( "/dummy-friend/:id", verifyJwt, updateDummyFriend )
router.delete( "/dummy-friend/:id", verifyJwt, deleteDummyFriend )

router.post( "/transaction-category", verifyJwt, createTransactionCategory )
router.get( "/transaction-categories", verifyJwt, getTransactionCategories )
router.patch( "/transaction-category/:id", verifyJwt, updateTransactionCategory )
router.delete( "/transaction-category/:id", verifyJwt, deleteTransactionCategory )

router.post( "/transaction-group", verifyJwt, createTransactionGroup )
router.get( "/transaction-groups", verifyJwt, getTransactionGroups )
router.patch( "/transaction-group/:id", verifyJwt, updateTransactionGroup )
router.delete( "/transaction-group/:id", verifyJwt, deleteTransactionGroup )


export default router
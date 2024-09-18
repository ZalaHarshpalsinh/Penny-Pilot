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
import multer from "multer";

const router = Router();

router.post( "/money-pools", verifyJwt, upload.single( "icon" ), createMoneyPool )
router.get( "/money-pools", verifyJwt, getMoneyPools )
router.patch( "/money-pools/:id", verifyJwt, upload.single( "icon" ), updateMoneyPool )
router.delete( "/money-pools/:id", verifyJwt, deleteMoneyPool )

router.post( "/dummy-friends", verifyJwt, createDummyFriend )
router.get( "/dummy-friends", verifyJwt, getDummyFriends )
router.patch( "/dummy-friends/:id", verifyJwt, updateDummyFriend )
router.delete( "/dummy-friends/:id", verifyJwt, deleteDummyFriend )

router.post( "/transaction-categories", verifyJwt, upload.single( "icon" ), createTransactionCategory )
router.get( "/transaction-categories", verifyJwt, getTransactionCategories )
router.patch( "/transaction-categories/:id", verifyJwt, upload.single( "icon" ), updateTransactionCategory )
router.delete( "/transaction-categories/:id", verifyJwt, deleteTransactionCategory )

router.post( "/transaction-groups", verifyJwt, upload.single( "icon" ), createTransactionGroup )
router.get( "/transaction-groups", verifyJwt, getTransactionGroups )
router.patch( "/transaction-groups/:id", verifyJwt, upload.single( "icon" ), updateTransactionGroup )
router.delete( "/transaction-groups/:id", verifyJwt, deleteTransactionGroup )


export default router
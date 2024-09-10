import { Router } from "express";
import {createMoneyPool,getMoneyPools,updateMoneyPool,deleteMoneyPool} from "../controller/customizationController.js";
import {createDummyFriend,getDummyFriends,updateDummyFriend,deleteDummyFriend} from "../controller/customizationController.js";
import {createTransactionCategory,getTransactionCategories,updateTransactionCategory,deleteTransactionCategory} from "../controller/customizationController.js";
import {createTransactionGroup,getTransactionGroups,updateTransactionGroup,deleteTransactionGroup} from "../controller/customizationController.js";

const router = Router();


router.post( "/money-pool",createMoneyPool )
router.get( "/money-pools",getMoneyPools )
router.patch( "/money-pool/:id" ,updateMoneyPool)
router.delete( "/money-pool/:id" ,deleteMoneyPool)

router.post( "/dummy-friend",createDummyFriend )
router.get( "/dummy-friends",getDummyFriends )
router.patch( "/dummy-friend/:id" ,updateDummyFriend)
router.delete( "/dummy-friend/:id",deleteDummyFriend )

router.post( "/transaction-category" ,createTransactionCategory)
router.get( "/transaction-categories",getTransactionCategories )
router.patch( "/transaction-category/:id",updateTransactionCategory )
router.delete( "/transaction-category/:id" ,deleteTransactionCategory)

router.post( "/transaction-group",createTransactionGroup )
router.get( "/transaction-groups" ,getTransactionGroups)
router.patch( "/transaction-group/:id",updateTransactionGroup )
router.delete( "/transaction-group/:id" ,deleteTransactionGroup)


export default router
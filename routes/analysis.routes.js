import { Router } from "express";
import {incomeCat ,incomeTransactionGroupWise,incomeMoneyPoolWise} from "../controller/analysisController.js";
import {expenseCat ,expenseTransactionGroupWise,expenseMoneyPoolWise} from "../controller/analysisController.js";
import {lentCategoryWise,lentFriendWise,lentMoneyPoolWise} from "../controller/analysisController.js";
import {borrowedCategoryWise,borrowedFriendWise,borrowedMoneyPoolWise} from "../controller/analysisController.js";


const router = Router();

router.get( "/income/category-wise" ,incomeCat)
router.get( "/income/transaction-group-wise",incomeTransactionGroupWise )
router.get( "/income/money-pool-wise",incomeMoneyPoolWise )

router.get( "/expense/category-wise" ,expenseCat)
router.get( "/expense/transaction-group-wise" ,expenseTransactionGroupWise)
router.get( "/expense/money-pool-wise" ,expenseMoneyPoolWise)

router.get( "/lent/category-wise",lentCategoryWise )
router.get( "/lent/friend-wise" ,lentFriendWise)
router.get( "/lent/money-pool-wise" ,lentMoneyPoolWise)

router.get( "/borrowed/category-wise" ,borrowedCategoryWise)
router.get( "/borrowed/friend-wise",borrowedFriendWise )
router.get( "/borrowed/money-pool-wise",borrowedMoneyPoolWise )

// router.get( "/overall/money-pool-wise" )
// router.get( "/overall/friend-wise" )


export default router
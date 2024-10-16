import { Router } from "express";
import
{
    getIncomeAnalysisCategoryWise,
    getExpenseAnalysisCategoryWise,
} from "../controllers/analysis.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

router.get( "/income/category-wise", verifyJwt, getIncomeAnalysisCategoryWise )
// router.get( "/income/transaction-group-wise", verifyJwt, incomeTransactionGroupWise )
// router.get( "/income/money-pool-wise", verifyJwt, incomeMoneyPoolWise )

router.get( "/expense/category-wise", verifyJwt, getExpenseAnalysisCategoryWise )
// router.get( "/expense/transaction-group-wise", verifyJwt, expenseTransactionGroupWise )
// router.get( "/expense/money-pool-wise", verifyJwt, expenseMoneyPoolWise )

// router.get( "/lent/category-wise", verifyJwt, lentCategoryWise )
// router.get( "/lent/friend-wise", verifyJwt, lentFriendWise )
// router.get( "/lent/money-pool-wise", verifyJwt, lentMoneyPoolWise )

// router.get( "/borrowed/category-wise", verifyJwt, borrowedCategoryWise )
// router.get( "/borrowed/friend-wise", verifyJwt, borrowedFriendWise )
// router.get( "/borrowed/money-pool-wise", verifyJwt, borrowedMoneyPoolWise )

// router.get( "/overall/money-pool-wise" )
// router.get( "/overall/friend-wise" )

export default router
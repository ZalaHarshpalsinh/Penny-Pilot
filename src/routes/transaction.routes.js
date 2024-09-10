import { Router } from "express";
import
{
    registerTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
} from "../controllers/transaction.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js";
const router = Router();

router.post( "/", verifyJwt, registerTransaction )
router.get( "/", verifyJwt, getAllTransactions )
router.get( "/:id", verifyJwt, getSingleTransaction )
router.patch( "/:id", verifyJwt, updateTransaction )
router.delete( "/:id", verifyJwt, deleteTransaction )

// router.get( "/income/category-wise" )
// router.get( "/income/transaction-group-wise" )
// router.get( "/income/money-pool-wise" )

// router.get( "/expense/category-wise" )
// router.get( "/expense/transaction-group-wise" )
// router.get( "/expense/money-pool-wise" )

// router.get( "/lent/category-wise" )
// router.get( "/lent/friend-wise" )
// router.get( "/lent/money-pool-wise" )

// router.get( "/borrowed/category-wise" )
// router.get( "/borrowed/friend-wise" )
// router.get( "/borrowed/money-pool-wise" )

// router.get( "/overall/money-pool-wise" )
// router.get( "/overall/friend-wise" )


export default router
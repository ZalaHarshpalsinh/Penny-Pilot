import { Router } from "express";

const router = Router();

router.get( "/income/category-wise" )
router.get( "/income/transaction-group-wise" )
router.get( "/income/money-pool-wise" )

router.get( "/expense/category-wise" )
router.get( "/expense/transaction-group-wise" )
router.get( "/expense/money-pool-wise" )

router.get( "/lent/category-wise" )
router.get( "/lent/friend-wise" )
router.get( "/lent/money-pool-wise" )

router.get( "/borrowed/category-wise" )
router.get( "/borrowed/friend-wise" )
router.get( "/borrowed/money-pool-wise" )

router.get( "/overall/money-pool-wise" )
router.get( "/overall/friend-wise" )






export default router
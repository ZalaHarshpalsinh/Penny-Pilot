import { Router } from "express";

const router = Router();


router.post( "/money-pool" )
router.get( "/money-pools" )
router.patch( "/money-pool/:id" )
router.delete( "/money-pool/:id" )

router.post( "/dummy-friend" )
router.get( "/dummy-friends" )
router.patch( "/dummy-friend/:id" )
router.delete( "/dummy-friend/:id" )

router.post( "/transaction-category" )
router.get( "/transaction-categories" )
router.patch( "/transaction-category/:id" )
router.delete( "/transaction-category/:id" )

router.post( "/transaction-group" )
router.get( "/transaction-groups" )
router.patch( "/transaction-group/:id" )
router.delete( "/transaction-group/:id" )


export default router
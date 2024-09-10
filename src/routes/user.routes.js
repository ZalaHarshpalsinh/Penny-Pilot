import { Router } from "express";

const router = Router();


router.post( "/register" )
router.post( "/login" )
router.post( "/logout" )
router.post( "/refresh-token" )
router.get( "/profile-details" )
router.patch( "/profile-details" )
router.patch( "/profile-photo" )
router.delete( "/account" )


export default router
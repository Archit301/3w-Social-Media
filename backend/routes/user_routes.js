import express from "express"
import { adminloginpannel, fetchuserdata, usersubmit } from "../controllers/user_controller.js"

const router=express.Router()

router.post('/userdata',usersubmit)
router.post('/check',adminloginpannel)
router.get('/fetchdata',fetchuserdata)


export default router

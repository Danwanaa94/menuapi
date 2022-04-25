const {Router} = require("express")
const { createFood, getMenu} = require("../controllers/foodController")
const {protect} = require("../middlewares/AuthMiddleware")


const router = Router()

router.route("/food").post(protect, createFood).get(protect, getMenu)

module.exports=router
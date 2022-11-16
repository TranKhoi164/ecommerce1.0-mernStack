import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import AccountController from "./controllers/account.controllers";
import AccountMiddleware from "../../middlewares/accountManagement/auth.middleware";
import JwtFlow from "../../utils/jwt";
import JwtMiddleware from "../../middlewares/accountManagement/jwt.middleware";

const authCtrl = new AuthController()
const accountCtrl = new AccountController()
const accountMiddleware = new AccountMiddleware()
const jwtMiddleware = new JwtMiddleware() 
const jwt = new JwtFlow()

const accountRoutes = Router()

//auth routes
accountRoutes.post('/register', accountMiddleware.registerMiddleware, authCtrl.userRegister)
accountRoutes.post('/login', authCtrl.userLogin)
accountRoutes.post('/active_account', authCtrl.activeAccountWithEmail)
accountRoutes.post('/logout', authCtrl.userLogout)
//account manipulation routes 
accountRoutes.get('/information', accountCtrl.getAccountInformation)
accountRoutes.patch('/update', accountCtrl.updateAccount)
accountRoutes.post('/forgot_password', accountCtrl.userForgotPassword)
accountRoutes.post('/reset_password', accountCtrl.userResetPassword)
//jwtController
accountRoutes.post('/get_accesstoken', jwtMiddleware.refreshAccessTokenMiddleware, jwt.refreshAccessToken)

export default accountRoutes
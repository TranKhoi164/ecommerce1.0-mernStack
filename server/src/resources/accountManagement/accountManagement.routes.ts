import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import AccountController from "./controllers/account.controllers";
import AuthMiddleware from "./middleware/auth.middleware";
import AccountMiddleware from "./middleware/account.middleware";
import JwtFlow from "./controllers/jwt.controller";
import JwtMiddleware from "./middleware/jwt.middleware";

const authCtrl = new AuthController()
const accountCtrl = new AccountController()
const authMiddleware = new AuthMiddleware()
const accountMiddleware = new AccountMiddleware()
const jwtMiddleware = new JwtMiddleware() 
const jwt = new JwtFlow()

const accountRoutes = Router()

//  /account/...
//auth routes
accountRoutes.post('/reset_password_email', authCtrl.sendResetPasswordEmail)
accountRoutes.post('/reset_password_token', authCtrl.resetPasswordWithAccessToken)
accountRoutes.post('/register', authMiddleware.registerMiddleware, authCtrl.userRegister)
accountRoutes.post('/login', authMiddleware.loginMiddleware, authCtrl.userLogin)
accountRoutes.get('/active_account', authMiddleware.activeAccountMiddleware, authCtrl.activeAccountWithEmail)
accountRoutes.get('/logout', authMiddleware.authUserMiddleware, authCtrl.userLogout)
//account manipulation routes 
accountRoutes.get('/information', authMiddleware.authUserMiddleware, accountCtrl.getAccountInformation)
accountRoutes.patch('/update_basic', authMiddleware.authUserMiddleware, accountMiddleware.updateBasicMiddleware, accountCtrl.updateAccountBasicInfor)
accountRoutes.patch('/update_password', authMiddleware.authUserMiddleware, accountMiddleware.updatePasswordMiddleware, accountCtrl.updateAccountPassword)
accountRoutes.post('/forgot_password', accountCtrl.userForgotPassword)
accountRoutes.post('/reset_password', accountCtrl.userResetPassword)
//jwtController
accountRoutes.post('/refresh_token', jwtMiddleware.refreshAccessTokenMiddleware, jwt.refreshAccessToken)

export default accountRoutes
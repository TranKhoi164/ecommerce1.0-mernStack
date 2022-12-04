import {Request, Response} from 'express' 
import JwtFlow from '../../../resources/accountManagement/controllers/jwt.controller'

interface AuthInterface { 
  userRegister(req: Request, res: Response): void
  userLogin(req: Request, res: Response): Promise<void>
  activeAccountWithEmail(req: Request, res: Response): Promise<void>
  userLogout(req: Request, res: Response): void
}

export default AuthInterface
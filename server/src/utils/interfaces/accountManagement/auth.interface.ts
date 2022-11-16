import {Request, Response} from 'express' 

interface AuthInterface { 
  userRegister(req: Request, res: Response): void
  userLogin(req: Request, res: Response): void
  activeAccountWithEmail(req: Request, res: Response): Promise<void>
  userLogout(req: Request, res: Response): void
}

export default AuthInterface
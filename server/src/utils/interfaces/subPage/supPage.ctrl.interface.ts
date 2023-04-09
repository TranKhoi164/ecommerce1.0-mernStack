import { Request, Response } from "express";

interface SubPageInterface {
  createSubPage(req: Request, res: Response): Promise<void>
  getSubPageBySlug(req: Request, res: Response): Promise<void>
  getSubPageListByPage(req: Request, res: Response): Promise<void>
  getSubPageList(req: Request, res: Response): Promise<void>
  deleteSubPage(req: Request, res: Response): Promise<void>
}

export default SubPageInterface
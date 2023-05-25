import { Request, Response } from "express";

interface PageInterface {
  createPage(req: Request, res: Response): Promise<void>
  getPageList(req: Request, res: Response): Promise<void>
  deletePage(req: Request, res: Response): Promise<void>
}

export default PageInterface
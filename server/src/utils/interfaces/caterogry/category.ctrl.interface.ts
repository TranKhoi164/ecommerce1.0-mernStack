import { Request, Response } from "express";

interface CategoryCtrlInterface {
  createCategory(req: Request, res: Response): Promise<void>
  getCategoryList(req: Request, res: Response): Promise<void>
  deleteCategory(req: Request, res: Response): Promise<void>
}

export default CategoryCtrlInterface
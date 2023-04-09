import { Request, Response } from "express";

interface SubCategoryCtrlInterface {
  createSubCategory(req: Request, res: Response): void
  getSubCategoryList(req: Request, res: Response): Promise<void>
  deleteSubCategory(req: Request, res: Response): Promise<void>
}

export default SubCategoryCtrlInterface
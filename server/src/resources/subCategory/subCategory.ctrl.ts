import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import CategoryCtrlInterface from "../../utils/interfaces/caterogry/category.ctrl.interface";
import SubCategories from "./subCategory.model";
import SubCategoryCtrlInterface from "../../utils/interfaces/subCategory/subCategory.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import Categories from "../category/category.model";

class SubCategoryCtrl implements SubCategoryCtrlInterface {
  public async createSubCategory(req: Request, res: Response): Promise<void> {
    try {
      const {name, category} = req.body.sub_category
      const newSubCategory = new SubCategories({...req.body.sub_category,slug:slugify(name)})
      newSubCategory.save()
      await Categories.updateOne({_id:category}, {$push: { subCategories: newSubCategory._id }})
      res.json({message: 'Tạo danh mục con thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getSubCategoryList(req: Request, res: Response): Promise<void> {
    try {
      const subCategoryList = await SubCategories.find({})
      res.json({sub_category_list: subCategoryList})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async deleteSubCategory(req: Request, res: Response): Promise<void> {
    try {
      await SubCategories.findOneAndDelete({_id: req.body.sub_category._id})
      res.json({message: 'Xóa danh mục con thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default SubCategoryCtrl
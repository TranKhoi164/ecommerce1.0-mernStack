import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import CategoryCtrlInterface from "../../utils/interfaces/caterogry/category.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import SubCategories from "../subCategory/subCategory.model";
import Categories from "./category.model";
import SubPages from "../subPage/subPage.model";

class CategoryCtrl implements CategoryCtrlInterface {
  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const {name, subPage} = req.body.category
      const newCategory = new Categories({...req.body.category, slug: slugify(name)})
      newCategory.save()
      await SubPages.updateOne({_id: subPage}, {$push: { categories: newCategory._id }})
      res.json({message: 'Tạo danh mục thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getCategoryList(req: Request, res: Response): Promise<void> {
    try {
      const categoryList = await Categories.find({})
      res.json({category_list: categoryList})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await Categories.findOneAndDelete({_id: req.body.category._id})
      await SubCategories.deleteMany({category: req.body.category._id})
      res.json({message: 'Xóa danh mục thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default CategoryCtrl
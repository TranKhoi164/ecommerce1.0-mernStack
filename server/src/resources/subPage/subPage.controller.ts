import { Request, Response } from "express";
import mongoose from "mongoose";
import handleException from "../../utils/handleExceptions";
import SubPageInterface from "../../utils/interfaces/subPage/supPage.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import SubPages from "./subPage.model";
import Pages from "../page/page.model";

const {ObjectId} = mongoose.Types

class SubPageController implements SubPageInterface {
  public async createSubPage(req: Request, res: Response): Promise<void> {
    try {
      const {name, page} = req.body.sub_page
      const newSubPage = new SubPages({name: name, page: new ObjectId(page), slug: slugify(req.body.sub_page.name)})
      newSubPage.save()
      await Pages.updateOne({_id: page}, {$push: {subPages: newSubPage._id}})
      res.json({message: 'Tạo trang con thành công'})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getSubPageBySlug(req: Request, res: Response): Promise<void> {
    try {
      const {page_slug, subPage_slug} = req.params

      console.log(page_slug, subPage_slug);

      Pages.findOne({slug: page_slug}, async (err: any, page: any) => {
        if (err) {
          handleException(400, err.message, res) 
          return
        }
        const subPage = await SubPages.findOne({page: page?._id, slug: subPage_slug})
                  .populate('page', 'name')
                  .populate({
                      path: 'categories', 
                      populate: {path: 'subCategories'}, 
                      select: 'name subCategories subPage'
                  })
        res.json({sub_page: subPage})
      }) 
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getSubPageListByPage(req: Request, res: Response): Promise<void> {
    try {
      const pageId = req.params.page_id
      const pageList = await SubPages.find({page: pageId})
      res.json({sub_page_list: pageList})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async getSubPageList(req: Request, res: Response): Promise<void> {
    try {
      const subPageList = await SubPages.find({})
                  .populate('page', 'name')
                  .populate({
                      path: 'categories', 
                      populate: {path: 'subCategories'}, 
                      select: 'name subCategories subPage'
                  })
      res.json({sub_page_list: subPageList})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  } 
  
  public async deleteSubPage(req: Request, res: Response): Promise<void> {
    try {
      await SubPages.findOneAndDelete({_id: req.body.sub_page._id})
      res.json({message: 'Xóa trang con thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default SubPageController
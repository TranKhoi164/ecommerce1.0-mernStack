import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import PageInterface from "../../utils/interfaces/page/page.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import Pages from "./page.model";
import SubPages from "../subPage/subPage.model";
import { deleteDataFromCache, getDataFromCache, saveDataToCache } from "../../service/redis/redis.service";
import cron from 'node-cron'
import { headerCache } from "../../utils/headerCache";

class PageController implements PageInterface {
  public async createPage(req: Request, res: Response): Promise<void> {
    try {
      const newPage = new Pages({...req.body.page, slug: slugify(req.body.page.name)})
      newPage.save()
      await deleteDataFromCache('pageList')
      res.json({message: 'Tạo trang mới thành công'})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getPageList(req: Request, res: Response): Promise<void> {
    try {
      const cachedPageList = await getDataFromCache('pageList')
      const maxAge = 60*60
      if (cachedPageList) {
        headerCache(maxAge, req, res)
        res.json({page_list: JSON.parse(cachedPageList)})
      } else {
        const pageList = await Pages.find({}).populate({
          path: 'subPages',
          populate: {
            path: 'categories',
            model: 'category',
            populate: {
              path: 'subCategories',
              model: 'subCategory',
            }
          }
        })
        await saveDataToCache('pageList', JSON.stringify(pageList), 60*60*24)
        const schedule = cron.schedule('*/1 * * *', async () => {
          console.log('ngu');
          const savePageList = await Pages.find({}).populate({
            path: 'subPages',
            populate: {
              path: 'categories',
              model: 'category',
              populate: {
                path: 'subCategories',
                model: 'subCategory',
              }
            }
          })
          await saveDataToCache('pageList', JSON.stringify(savePageList))
        })
        schedule.start()
        setTimeout(()=>{
          schedule.stop()
        }, 1000*60*60*24)

        headerCache(maxAge, req, res)
        res.json({page_list: pageList})
      }
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async deletePage(req: Request, res: Response): Promise<void> {
    try {
      await Pages.findOneAndDelete({_id: req.body.page._id})
      await SubPages.deleteMany({page: req.body.page._id})
      res.json({message: 'Xóa trang thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default PageController
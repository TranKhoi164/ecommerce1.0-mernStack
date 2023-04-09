import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import PageInterface from "../../utils/interfaces/page/page.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import Pages from "./page.model";
import SubPages from "../subPage/subPage.model";
import { getDataFromCache, saveDataToCache } from "../../service/redis/redis.service";
import cron from 'node-cron'

class PageController implements PageInterface {
  public createPage(req: Request, res: Response): void {
    try {
      const newPage = new Pages({...req.body.page, slug: slugify(req.body.page.name)})
      newPage.save()
      res.json({message: 'Tạo trang mới thành công'})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getPageList(req: Request, res: Response): Promise<void> {
    try {
      const cachedPageList = await getDataFromCache('pageList')
      if (cachedPageList) {
        console.log(1);
        res.json({page_list: JSON.parse(cachedPageList)})
      } else {
        console.log(2);
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
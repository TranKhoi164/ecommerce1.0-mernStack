import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import AttributeCtrlInterface from "../../utils/interfaces/attribute/attribute.ctrl.interface";
import ProductCtrlInterface from "../../utils/interfaces/product/product.ctrl.interface";
import { slugify } from "../../utils/stringFunc/slugify";
import Attributes from "./attribute.model";
import { deleteDataFromCache, getDataFromCache, saveDataToCache } from "../../service/redis/redis.service";
import { headerCache } from "../../utils/headerCache";


class AttributeCtrl implements AttributeCtrlInterface {
  public async createAttribute(req: Request, res: Response): Promise<void> {
    try {
      const {name} = req.body.attribute
      const newAttribute = new Attributes({...req.body.attribute, slug: slugify(name)})
      newAttribute.save()
      await deleteDataFromCache('attributes')
      res.json({message: 'Tạo thuộc tính thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getAttributeList(req: Request, res: Response): Promise<void> {
    try {
      // await saveDataToCache('pageList', JSON.stringify(pageList), 60*60*24)
      //   const schedule = cron.schedule('*/1 * * *', async () => {
      //     const savePageList = await Pages.find({}).populate({
      //       path: 'subPages',
      //       populate: {
      //         path: 'categories',
      //         model: 'category',
      //         populate: {
      //           path: 'subCategories',
      //           model: 'subCategory',
      //         }
      //       }
      //     })
      //     await saveDataToCache('pageList', JSON.stringify(savePageList), 60*60*24)
      //   })
      //   schedule.start()
      //   setTimeout(()=>{
      //     schedule.stop()
      //   }, 1000*60*60*24)
      let cachedAttributes = await getDataFromCache('attributes')
      const maxAge = 60*60
      if (cachedAttributes) {
        headerCache(maxAge, req, res)
        res.json({attribute_list: JSON.parse(cachedAttributes)})
        return
      } else {
        const attributeList = await Attributes.find({})

        await saveDataToCache('attributes', JSON.stringify(attributeList), 60*60)
        
        headerCache(maxAge, req, res)
        res.json({attribute_list: attributeList})
      }


    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async addAttributeValue(req: Request, res: Response): Promise<void> {
    try {
      await Attributes.findByIdAndUpdate(req.body.attribute._id, {$push: {values: req.body.attribute.value}})
      res.json({message: 'Tạo giá trị thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async deleteAttributeValue(req: Request, res: Response): Promise<void> {
    try {
      const {value} = req.body.attribute
      console.log(req.body.attribute);
      await Attributes.updateOne({_id: req.body.attribute._id}, {$pullAll: {
        values: [value],
      }})
      res.json({message: 'Xóa thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async deleteAttribute(req: Request, res: Response): Promise<void> {
    try {
      await Attributes.findByIdAndDelete(req.body.attribute._id)
      res.json({message: 'Xóa thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default AttributeCtrl
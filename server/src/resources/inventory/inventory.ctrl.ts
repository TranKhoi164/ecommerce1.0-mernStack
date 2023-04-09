import Inventories from "./inventory.model";
import InventoryInterface from "../../utils/interfaces/inventory/inventory.interface";
import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import Products from "../product/product.model";

class InventoryCtrl implements InventoryInterface {
  public async createInventory(req: Request, res: Response): Promise<void> {
    try {
      const {inventories, product_id} = req.body.inventories
      let minPrice = 1000000000000, maxPrice = -1
      let inventoriesTemp: Array<String> = []

      for (let inventory of inventories) {
        minPrice = Math.min(minPrice, inventory.price)
        maxPrice = Math.max(maxPrice, inventory.price)
        const inventoryData = new Inventories({...inventory, product: product_id})
        await inventoryData.save()
        inventoriesTemp.push(inventoryData['_id'].toString())
      }
      await Products.findByIdAndUpdate(product_id,  { 
          $push: { inventories: inventoriesTemp }, 
          maxPrice: maxPrice, 
          minPrice: minPrice, 
        }
      )
      res.json({message: 'Nhập thông tin kho thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async updateInventory(req: Request, res: Response): Promise<void> {
    try {
      const {inventory} = req.body
      const updateInventory = await Inventories.findOne({sku: inventory.sku, shippingAddress: inventory.shippingAddress})

      console.log('inventory: ', inventory);
      
      if (updateInventory?.quantity !== undefined && inventory?.quantity !== undefined) {
        updateInventory.quantity = updateInventory.quantity - inventory.quantity
      }
      await updateInventory?.save(function(err: any) {
        if (err) {
          return handleException(400, err.message, res)
        }
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default InventoryCtrl
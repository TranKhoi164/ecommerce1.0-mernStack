import { Request, Response } from "express";

interface InventoryInterface {
  createInventory(req: Request, res: Response): Promise<void>
}

export default InventoryInterface
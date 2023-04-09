import { Request, Response } from "express";

interface RatingInterface {
  createRating(req: Request, res: Response): Promise<void>
  getRating(req: Request, res: Response): Promise<void>
}

export default RatingInterface
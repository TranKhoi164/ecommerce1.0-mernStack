import { Response } from "express";

export default function handleException(status: number, msg: string, res: Response ): Response {
  return res.status(status).json({message: msg})
}
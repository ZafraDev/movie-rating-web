import { Request, Response, NextFunction } from 'express'

export const handleController = (callback: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error) {
      console.log('corriendo')
      next(error)
    }
  }

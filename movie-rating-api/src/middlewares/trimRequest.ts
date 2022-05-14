import { Request, Response, NextFunction } from 'express'

const trimStringProperties = (obj: {[key: string]: any}): any => {
  for (const prop in obj) {
    // if the property is an object trim it too
    if (typeof obj[prop] === 'object') {
      return trimStringProperties(obj[prop])
    }

    // if it's a string remove begin and end whitespaces
    if (typeof obj[prop] === 'string') {
      obj[prop] = obj[prop].trim()
    }
  }
}

// trimRequest middleware: trim all request object: body, params, query
const all = function (req: Request, _res: Response, next: NextFunction): void {
  trimStringProperties(req.body)

  trimStringProperties(req.params)

  trimStringProperties(req.query)

  next()
}

// trimBody middleware: trim only the body object
const body = function (req: Request, _res: Response, next: NextFunction): void {
  trimStringProperties(req.body)
  next()
}

const param = function (req: Request, _res: Response, next: NextFunction): void {
  trimStringProperties(req.params)
  next()
}

const query = function (req: Request, _res: Response, next: NextFunction): void {
  trimStringProperties(req.query)
  next()
}

export default {
  all,
  body,
  param,
  query
}

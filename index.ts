import express, { Express, Request, Response } from 'express'

const dotenv = require('dotenv')
const { PrismaClient } = require('@prisma/client')

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const prisma = new PrismaClient()

var myMiddlware = (req: Request, res: Response, next: any) => {
  console.log('A middleware just got executed')
  next()
}

app.use(myMiddlware)

type Product = {
  id: number
  name: string
  price: number
}

app.get('/products', async (req: Request, res: Response) => {
  const listOfProducts: Product[] = await prisma.productos.findMany()
  if (listOfProducts.length) {
    return res.send(listOfProducts)
  }
  return res.send("List of products wasn't found")
})

app.listen(port, () => console.log(`Listening to port ${port}`))

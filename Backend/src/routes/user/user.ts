import express from 'express'
import expenses from './expenses/expenses'
import category from './category/category'

const app = express()

app.use('/expense', expenses)
app.use('/category', category)


export default app
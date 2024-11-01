import express from 'express'
import db from '../../../libs/db'
import { middleware } from '../../../middleware/authMiddleware'

const router = express.Router()
router.use(middleware)

// Add the expense to the database
router.post(('/add'), async (req, res) => {
    const { amount, description, date, payment_method, category_id } = req.body

    try {
        const response = await db.expense.create({
            data: {
                user_id: req.session.userId as string,
                category_id: category_id,
                amount: amount,
                description: description,
                date: date,
                payment_method: payment_method,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })

        res.send({
            message: 'Expense Added Successfully'
        })
        return

    } catch(error) {

        res.status(500).send({
            message: 'Error while adding expense',
            error: error
        })
        return
    }
    
})



// Update the expense
router.post(('/update'), async (req, res) => {
    const { amount, description, date, payment_method } = req.body

    try {

        await db.expense.update({
            where: {
                user_id: 'id',
                id: 1
            },

            data: {
                amount: amount,
                description: description,
                date: date,
                payment_method: payment_method,
                updated_at: Date.now().toString()
            }
        })

        res.send({
            message: 'Expense updated successfully'
        })
        return

    } catch(error) {

        res.status(500).send({
            message: 'Error while updating expense'
        })
        return
    }

})



// Delete the expense
router.post(('/delete'), async (req, res) => {
    const { id } = req.body

    try {

        const response = await db.expense.delete({
            where: {
                id: id
            }
        })

        res.send({
            message: 'Expense deleted successfully'
        })
        return

    } catch(error) {

        res.status(500).send({
            message: 'Error while deleting expense'
        })
        return
    }

})


router.get(('/getall'), async (req, res) => {

    const user_id = req.session.userId

    try {

        const response = await db.expense.findMany({
            where: {
                user_id: user_id
            }
        })
        res.send(response)
        return

    } catch(error) {

        res.status(500).send({
            message: 'Error while fetching all expenses'
        })
        return
    }
})


export default router
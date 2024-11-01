export default interface Expenses {
    id: number,
    user_id: string,
    category_id: string,
    amount: number,
    description: string,
    date: Date,
    payment_method: string,
    created_at: Date,
    updated_at: Date,
}
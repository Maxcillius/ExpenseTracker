interface Expense {
    user_id:         string,
    category_id:     string,
    amount:          number,
    description?:    string,
    date:            string,
    payment_method:  string,
    created_at:      string,
    updated_at:      string,
}


interface User {
    email:           string,
    password:        string
}

export { Expense, User }
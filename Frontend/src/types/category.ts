export default interface Category {
    id: string,
    user_id: string,
    name: string,
    color: string,
    is_default: boolean,
    created_at: Date,
    updated_at: Date
}
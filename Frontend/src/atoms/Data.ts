import { atom } from "recoil"
import Expenses from "../types/expenses"

export const categoryNameMap = atom<Map<string, string>>({
    key: 'categoryNameMap',
    default: new Map<string, string>()
})

export const categoriesAtom = atom({
    key: 'categoriesAtom',
    default: []
})

export const expensesAtom = atom<Expenses[]>({
    key: 'expensesAtom',
    default: []
})
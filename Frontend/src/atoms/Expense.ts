import { atom } from "recoil"

export const categoryAtom = atom({
    key: 'categoryAtom',
    default: {
        name: 'Category',
        id: '1'
    }
})

export const amountAtom = atom({
    key: 'amountAtom',
    default: 0
})

export const descriptionAtom = atom({
    key: 'descriptionAtom',
    default: ''
})

export const dateAtom = atom({
    key: 'dateAtom',
    default: ''
})
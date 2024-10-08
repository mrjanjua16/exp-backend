import vine from '@vinejs/vine'

export const createTransactionValidator = vine.compile(
    vine.object({
        amount: vine.number().min(1),
        categoryId: vine.number(),
        date: vine.string(),
    })
)

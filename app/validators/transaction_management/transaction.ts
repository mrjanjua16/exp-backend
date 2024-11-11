import vine from '@vinejs/vine'

export const createTransactionValidator = vine.compile(
    vine.object({
        amount: vine.number().min(1),
        category_id: vine.number(),
        date: vine.number(),
    })
)

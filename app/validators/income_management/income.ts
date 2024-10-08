import vine from '@vinejs/vine'

export const createIncExpValidator = vine.compile(
    vine.object({
        user_id: vine.number(),
        category_id: vine.number(),
        planned: vine.number().optional(),
        actual: vine.number().optional(),
        month: vine.string().optional()
    })
)
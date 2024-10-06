import vine from '@vinejs/vine'
import { category } from '../../constants/enum.js'

export const createValidator = vine.compile(
    vine.object({
        name: vine.string(),
        type: vine.enum(category)
    })
)

import vine from '@vinejs/vine'

export const createPlanned = vine.compile(
  vine.object({
    category_id: vine.number(),
    planned: vine.number(),
    month: vine.string(),
  })
)

export const monthValidator = vine.compile(
  vine.object({
    month: vine.string(),
  })
)

export const categoryValidator = vine.compile(
  vine.object({
    category_id: vine.number(),
  })
)

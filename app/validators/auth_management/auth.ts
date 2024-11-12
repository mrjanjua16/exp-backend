import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

const email_validator = vine.string().unique(async (db: Database, value: string) => {
  const result = await db.from('users').where('email', value).first()
  return !result
})

export const SignupValidator = vine.compile(
  vine.object({
    full_name: vine.string(),
    email: email_validator.clone(),
    password: vine.string(),
    password_confirmation: vine.string(),
  })
)

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string(),
    password: vine.string(),
  })
)

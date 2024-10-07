import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { category } from '../constants/enum.js'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: category

  @column()
  declare created_by: number

  @column()
  declare updated_by: number

  @column()
  declare deleted_by: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @column.dateTime()
  declare deleted_at: DateTime

  @manyToMany(() => User, {
    pivotTable: 'user_categories',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'user_id'
  })
  declare users: ManyToMany<typeof User>
}
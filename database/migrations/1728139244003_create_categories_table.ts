import { BaseSchema } from '@adonisjs/lucid/schema'
import { category } from '../../app/constants/enum.js'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.enum('type', Object.values(category)).notNullable()

      table.integer('created_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table.integer('updated_by')
        .unsigned()
        .references('id')
        .inTable('users')
      table.integer('deleted_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
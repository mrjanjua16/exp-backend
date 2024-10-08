import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'incomes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table.integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .notNullable()
      table.integer('planned')
        .unsigned()
      table.integer('actual')
      table.string('month').notNullable()

      table.integer('created_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .notNullable()
      table.integer('updated_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .nullable()
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
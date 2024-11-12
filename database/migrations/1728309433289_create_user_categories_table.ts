import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.unique(['user_id', 'category_id'])
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('cascade')
      table.integer('created_by').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('updated_by').unsigned().references('id').inTable('users').onDelete('cascade')
      table
        .integer('deleted_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
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

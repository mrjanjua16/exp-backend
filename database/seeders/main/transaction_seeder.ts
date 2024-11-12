import { TransactionFactory } from '#database/factories/transaction_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await TransactionFactory.createMany(5)
  }
}

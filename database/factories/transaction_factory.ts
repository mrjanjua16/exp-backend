import factory from '@adonisjs/lucid/factories'
import Transaction from '#models/transaction'
import User from '#models/user'
import { format } from 'date-fns'

export const TransactionFactory = factory
  .define(Transaction, async ({ faker }) => {
    const user = await User.find(1)
    if (!user) {
      throw new Error('User does not exist. Skipping seeds')
    }

    return {
      user_id: user.id,
      amount: faker.number.int({ min: 100, max: 10000 }),
      category_id: faker.number.int({ min: 1, max: 10 }),
      date: format(faker.date.recent(), 'mm/dd/yyyy') + '',
      created_by: user.id,
    }
  })
  .build()

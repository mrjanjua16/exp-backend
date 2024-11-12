import { LedgerService } from '#services/ledger_management/ledger_service'
import { TransactionService } from '#services/transaction_management/transaction_service'
import { createTransactionValidator } from '#validators/transaction_management/transaction'
import type { HttpContext } from '@adonisjs/core/http'
import { errorHandler } from '../../helpers/error_handler.js'

export default class TransactionsController {
  async store({ request, auth, response }: HttpContext) {
    try {
      const transaction = await request.validateUsing(createTransactionValidator)
      const { amount, category_id, date } = transaction
      const user_id = auth.user!.id
      const record = await TransactionService.create(amount, category_id, date, user_id)
      if (record) {
        const month = new Date(date).toISOString().slice(0, 7)
        const planned = 0
        const actual = amount
        await LedgerService.createLedger(month, category_id, planned, actual, user_id, user_id)
      }
      return transaction
    } catch (error) {
      errorHandler('Transaction', error, response)
    }
  }

  async list({ auth, response }: HttpContext) {
    if (auth.user) {
      const transactions = await TransactionService.list(auth.user?.id)
      return response.ok(transactions)
    } else {
      return response.badRequest('User does not exist.')
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      if (auth.user) {
        const transaction = await TransactionService.delete(params.id, auth.user.id)

        return response.ok(transaction)
      } else {
        return response.badRequest('User does not exist.')
      }
    } catch (error) {
      errorHandler('Transaction', error, response)
    }
  }
}

import { LedgerService } from '#services/ledger_management/ledger_service'
import {
  categoryValidator,
  createPlanned,
  monthValidator,
} from '#validators/ledger_management/ledger'
import type { HttpContext } from '@adonisjs/core/http'

export default class IncomesController {
  async addPlanned({ request, auth, response }: HttpContext) {
    try {
      const valid_planned = await request.validateUsing(createPlanned)
      const { month, category_id, planned } = valid_planned
      const actual = 0
      const user_id = auth.user!.id
      const plannedAmount = await LedgerService.createLedger(
        month,
        category_id,
        planned,
        actual,
        user_id,
        user_id
      )
      return response.ok(plannedAmount)
    } catch (error) {
      if (error.code === '23505') {
        return response.conflict({
          status: 409,
          message: `Conflict: ${error.detail}`,
          constraint: error.constraint,
        })
      } else if (error.code === '23503') {
        return response.badRequest({
          status: 400,
          message: `Foreign Key Violation: ${error.detail || 'Invalid reference found.'}`,
          constraint: error.constraint,
        })
      } else {
        return response.badRequest({
          status: 400,
          code: error.code,
          message: error.message || 'An unexpected error occurred',
        })
      }
    }
  }

  async listPerMonth({ request, auth, response }: HttpContext) {
    try {
      const valid_request = await request.validateUsing(monthValidator)
      const { month } = valid_request
      const user_id = auth.user!.id
      const list = await LedgerService.listLedgerPerMonth(month, user_id)
      return response.ok(list)
    } catch (error) {
      return response.badRequest({
        status: 400,
        code: error.code,
        message: error.message || 'An unexpected error occurred',
      })
    }
  }

  async listPerCategory({ request, auth, response }: HttpContext) {
    try {
      const valid_request = await request.validateUsing(categoryValidator)
      const { category_id } = valid_request
      const user_id = auth.user!.id
      const list = await LedgerService.listLedgerPerCategory(category_id, user_id)
      return response.ok(list)
    } catch (error) {
      return response.badRequest({
        status: 400,
        code: error.code,
        message: error.message || 'An unexpected error occurred',
      })
    }
  }
}

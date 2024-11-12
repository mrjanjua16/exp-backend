import Category from '#models/category'
import Income from '#models/ledger'
import { CommonServices } from '#services/common/common_service'

export class LedgerService {
  /**
   * Creates the income ledger
   * @param month
   * @param category_id
   * @param planned
   * @param actual
   * @param user_id
   * @param auth_user
   * @returns - Income ledger
   */
  static async createLedger(
    month: string,
    category_id: number,
    planned: number,
    actual: number,
    user_id: number,
    auth_user: number
  ) {
    const valid_month = await CommonServices.validMonth(month)
    const valid_category = await CommonServices.validCategory(category_id)
    const valid_user = await CommonServices.validUser(user_id)
    const valid_plan = await Income.query()
      .where('user_id', valid_user)
      .andWhere('category_id', valid_category)
      .andWhere('month', valid_month)
      .first()
    if (!valid_plan) {
      const income = await Income.create({
        user_id: valid_user,
        category_id: valid_category,
        month: valid_month,
        planned: planned,
        actual: actual,
        created_by: auth_user,
      })
      return income
    } else {
      const income = await Income.query()
        .increment({
          planned: +planned,
          actual: +actual,
        })
        .where('user_id', valid_user)
        .andWhere('category_id', valid_category)
        .andWhere('month', valid_month)
      return income
    }
  }

  static async listLedgerPerMonth(month: string, user_id: number) {
    const valid_month = await CommonServices.validMonth(month)
    const ledger = await Income.query().where('user_id', user_id).andWhere('month', valid_month)
    if (!ledger) {
      return { error: { code: 404, message: 'No income ledger found.' } }
    }
    const ledger_details = await Promise.all(
      ledger.map(async (ledger) => {
        const category = await Category.find(ledger.category_id)
        if (!category) {
          return null
        }
        return {
          ...ledger.serializeAttributes(),
          category_name: category.name,
          category_type: category.type,
          createdBy: undefined,
          updatedBy: undefined,
          deletedBy: undefined,
          updatedAt: undefined,
          deletedAt: undefined,
        }
      })
    )
    return ledger_details.filter(Boolean)
  }

  static async listLedgerPerCategory(category_id: number, user_id: number) {
    const valid_category = await CommonServices.validCategory(category_id)
    const ledger = await Income.query()
      .where('user_id', user_id)
      .andWhere('category_id', valid_category)
    if (!ledger) {
      return { error: { code: 404, message: 'No income ledger found.' } }
    }
    return ledger
  }
}

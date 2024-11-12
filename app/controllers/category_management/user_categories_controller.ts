import { UserCategoriesService } from '#services/category_management/user_category_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserCategoriesController {
  async add({ request, auth, response }: HttpContext) {
    try {
      const valid_categories = request.input('category_id').map(Number)
      const user_categories = await UserCategoriesService.create(
        valid_categories,
        auth.user?.id || Number.MIN_SAFE_INTEGER
      )
      return response.ok(user_categories)
    } catch (error) {
      if (error.code === '23505') {
        return response.conflict({
          status: 409,
          message: `Conflict: ${error.detail || 'Category already exists.'}`,
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

  async list({ auth, response }: HttpContext) {
    const user_categories = await UserCategoriesService.list(
      auth.user?.id || Number.MIN_SAFE_INTEGER
    )
    if (!user_categories) {
      return { error: { status: 404, message: 'No user category found.' } }
    }
    return response.ok(user_categories)
  }

  async remove({ request, auth, response }: HttpContext) {
    try {
      const valid_categories = request.input('category_id').map(Number)
      const user_categories = await UserCategoriesService.remove(
        valid_categories,
        auth.user?.id || Number.MIN_SAFE_INTEGER
      )
      return response.ok(user_categories)
    } catch (error) {
      if (error.code === '23505') {
        return response.conflict({
          status: 409,
          message: `Conflict: ${error.detail || 'Category already removed.'}`,
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
  async removeAll({ auth, response }: HttpContext) {
    const user_categories = await UserCategoriesService.removeAll(
      auth.user?.id || Number.MIN_SAFE_INTEGER
    )
    return response.ok(user_categories)
  }
}

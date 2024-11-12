import { CategoryService } from '#services/category_management/category_service'
import { createValidator } from '#validators/category_management/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async create({ request, auth, response }: HttpContext) {
    try {
      const valid_category = await request.validateUsing(createValidator)
      const category = await CategoryService.add(
        valid_category,
        auth.user?.id || Number.MIN_SAFE_INTEGER
      )
      return response.created({
        message: 'Category created.',
        data: category,
      })
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

  async list({ response }: HttpContext) {
    const list = await CategoryService.list()
    return response.ok(list)
  }

  async update({ request, params, auth, response }: HttpContext) {
    try {
      const valid_update = await request.validateUsing(createValidator)
      const updated = await CategoryService.update(
        params.id,
        valid_update,
        auth.user?.id || Number.MIN_SAFE_INTEGER
      )
      return response.ok(updated)
    } catch (error) {
      if (error.code === '23505') {
        return response.conflict({
          status: 409,
          message: `Conflict: ${error.detail || 'Category with same name already exists.'}`,
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

  async delete({ params, auth, response }: HttpContext) {
    const deleted = await CategoryService.delete(
      params.id,
      auth.user?.id || Number.MIN_SAFE_INTEGER
    )
    return response.ok(deleted)
  }
}

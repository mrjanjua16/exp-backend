import Category from '#models/category'
import User from '#models/user'

export class UserCategoriesService {
  // Attach User Categories
  static async create(category_ids: number[], user_id: number) {
    // Check if category_ids array is empty or invalid
    if (!category_ids || category_ids.length === 0) {
      return { error: { status: 400, message: 'No categories provided!' } }
    }

    // Validate the user
    const valid_user = await User.find(user_id)
    if (!valid_user) {
      return { error: { status: 404, message: 'User not found!' } }
    }
    if (valid_user.deleted_by !== null) {
      return { error: { status: 404, message: 'User is inactive, please contact administrator!' } }
    }

    const validCategoryIds = []
    const errorMessages = []

    // Get existing category IDs associated with the user
    const existingCategories = await valid_user.related('categories').query()
    const existingCategoryIds = existingCategories.map((category) => category.id)

    // Validate each category
    for (const category_id of category_ids) {
      const valid_category = await Category.find(category_id)
      if (!valid_category) {
        errorMessages.push(`Category with ID ${category_id} not found!`)
        continue // Skip this category and move to the next
      }
      if (valid_category.deleted_by !== null) {
        errorMessages.push(
          `Category with ID ${category_id} is inactive, please contact administrator!`
        )
        continue // Skip this category and move to the next
      }
      // Check if the category is already attached to the user
      if (!existingCategoryIds.includes(category_id)) {
        validCategoryIds.push(category_id) // Collect valid categories that are not already attached
      }
    }

    // Attach the valid categories to the user
    if (validCategoryIds.length > 0) {
      await valid_user.related('categories').attach(validCategoryIds)
    }

    return {
      message: 'User categories added successfully.',
      errors: errorMessages.length > 0 ? errorMessages : undefined, // Return errors if any
    }
  }

  // Detach User All Categories
  static async removeAll(user_id: number) {
    const valid_user = await User.find(user_id)
    if (!valid_user) {
      return { error: { status: 404, message: 'User not found!' } }
    }
    if (valid_user.deleted_by !== null) {
      return { error: { status: 404, message: 'User is inactive, please contact administrator!' } }
    }

    await valid_user.related('categories').detach()
    return { message: 'All user categories removed.' }
  }

  // Detach User Specific Categories
  static async remove(category_ids: number[], user_id: number) {
    const valid_user = await User.find(user_id)
    if (!valid_user) {
      return { error: { status: 404, message: 'User not found!' } }
    }
    if (valid_user.deleted_by !== null) {
      return { error: { status: 404, message: 'User is inactive, please contact administrator!' } }
    }

    for (const category_id of category_ids) {
      const valid_category = await Category.find(category_id)
      if (!valid_category) {
        return { error: { status: 404, message: 'Category not found!' } }
      }
      if (valid_category.deleted_by !== null) {
        return {
          error: { status: 404, message: 'Category is inactive, please contact administrator!' },
        }
      }
    }

    await valid_user.related('categories').detach(category_ids) // Make sure it's 'categories', not 'category'
    return { message: 'User categories removed.' }
  }

  static async list(user_id: number) {
    const valid_user = await User.find(user_id)
    if (!valid_user) {
      return { error: { status: 404, message: 'User not found!' } }
    }
    if (valid_user.deleted_by !== null) {
      return { error: { status: 404, message: 'User is inactive, please contact administrator!' } }
    }

    const user_categories = await valid_user
      .related('categories')
      .query()
      .whereNull('categories.deleted_by')
      .exec()
    console.log(user_categories)
    return user_categories
  }
}

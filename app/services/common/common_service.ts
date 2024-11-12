import Category from '#models/category'
import User from '#models/user'

export class CommonServices {
  /**
   * Checks if the user exists
   * @param user_id
   * @returns - true or false if user exists
   */
  static async validUser(user_id: number) {
    const valid_user = await User.find(user_id)
    if (!valid_user) {
      throw { error: { code: 404, message: 'User not found!' } }
    }
    return valid_user.id
  }

  /**
   * Checks if the month is date format
   * @param month
   * @returns - true or false
   */
  static async validMonth(month: string) {
    const valid_month = !isNaN(new Date(month).getTime())
    if (!valid_month) {
      throw { error: { code: 400, message: 'Provide correct date.' } }
    }
    return month
  }

  /**
   * Checks if the category is valid
   * @param category_id
   * @returns - true or false
   */
  static async validCategory(category_id: number) {
    const valid_category = await Category.find(category_id)
    if (!valid_category) {
      throw { error: { code: 404, message: 'Category not found.' } }
    }
    return valid_category.id
  }
}

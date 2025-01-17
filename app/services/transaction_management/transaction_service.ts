import Category from '#models/category'
import Transaction from '#models/transaction'
import User from '#models/user'
import { AccountService } from '#services/account_management/account_service'
import { DateTime } from 'luxon'
import { category } from '../../constants/enum.js'

interface transactionType {
  amount?: number
  category_id?: number
  date?: string
}

export class TransactionService {
  static async create(amount: number, categoryId: number, date: string, userId: number) {
    const valid_category = await Category.find(categoryId)
    if (!valid_category) {
      return {
        error: { status: 404, message: 'Category not found, please select a valid category.' },
      }
    }

    const valid_user = await User.find(userId)
    if (!valid_user) {
      return { error: { status: 404, message: 'User not found!' } }
    }

    const existingCategories = await valid_user.related('categories').query()
    const existingCategoryIds = existingCategories.map((cat) => cat.id)

    if (!existingCategoryIds.includes(categoryId)) {
      await valid_user.related('categories').attach([categoryId])
    }

    let transactionAmount = amount
    if (valid_category.type === category.EXPENSE) {
      transactionAmount = -amount
    }

    const addToAccounts = await AccountService.add(transactionAmount, date, userId)

    if (addToAccounts) {
      const transaction = await Transaction.create({
        user_id: userId,
        amount: amount,
        date: date,
        category_id: categoryId,
        created_by: userId,
      })
      return {
        message: 'Transaction has been added.',
        transaction: transaction,
      }
    } else {
      return {
        error: 'Failed to add transaction.',
      }
    }
  }

  static async list(userId: number) {
    const list = await Transaction.query().where('user_id', userId).whereNull('deleted_by')
    if (list) {
      const transactionsWithCategories = await Promise.all(
        list.map(async (transaction) => {
          const category = await Category.find(transaction.category_id)
          if (category) {
            return {
              ...transaction.serializeAttributes(),
              categoryName: category.name,
              categoryType: category.type,
              createdBy: undefined,
              updatedBy: undefined,
              deletedBy: undefined,
              updatedAt: undefined,
              deletedAt: undefined,
            }
          } else {
            return {
              ...transaction.serializeAttributes(),
              categoryName: ' ',
              categoryType: ' ',
              createdBy: undefined,
              updatedBy: undefined,
              deletedBy: undefined,
              createdAt: undefined,
              updatedAt: undefined,
              deletedAt: undefined,
            }
          }
        })
      )
      return transactionsWithCategories
    } else {
      return { error: { status: 404, message: 'Transactions not found.' } }
    }
  }

  static async delete(transactionId: number, userId: number) {
    const transaction = await Transaction.find(transactionId)
    if (transaction) {
      if (transaction.user_id === userId) {
        if (transaction.deleted_by === null) {
          transaction.deleted_by = userId
          transaction.deleted_at = DateTime.now()
          await transaction.save()
          return { message: 'Transaction has been deleted.' }
        } else {
          return { message: 'Transaction is already deleted.' }
        }
      } else {
        return {
          error: {
            status: 404,
            message: 'You cannot delete this transaction as it does not belong to you.',
          },
        }
      }
    } else {
      return { error: { status: 404, message: 'Transaction not found.' } }
    }
  }
}

import Category from "#models/category";
import Transaction from "#models/transaction";
import { DateTime } from "luxon";

export class TransactionService {
    static async create(amount: number, categoryId: number, userId: number) {
        const category = await Category.find(categoryId);
        if (category) {
            const transaction = await Transaction.create({
                user_id: userId,
                amount: amount,
                category_id: categoryId,
                created_by: userId,
            })
            return transaction;
        } else {
            return { error: { status: 404, message: 'Category not found, please select a valid category.' } }
        }

    }

    static async list(userId: number) {
        const list = await Transaction.query().where('user_id', userId).whereNull('deleted_by');
        if (list) {
            const transactionsWithCategories = await Promise.all(list.map(async (transaction) => {
                const category = await Category.find(transaction.category_id);
                if (category) {
                    return {
                        ...transaction.serializeAttributes(),
                        category_name: category.name,
                        category_type: category.type,

                    };
                } else {
                    return {
                        ...transaction.serializeAttributes(),
                        category_name: 'Unknown',
                        category_type: 'Unknown',
                    };
                }
            }));
            return transactionsWithCategories;
        } else {
            return { error: { status: 404, message: 'Transactions not found.' } }
        }
    }

    static async delete(transactionId: number, userId: number) {
        const transaction = await Transaction.find(transactionId);
        if (transaction) {
            if (transaction.user_id === userId) {
                if (transaction.deleted_by !== null) {
                    transaction.deleted_by === userId;
                transaction.deleted_at === DateTime.now();
                await transaction.save();
                return { message: 'Transaction has been deleted.' }
                } else {
                    return { message: 'Transaction is already deleted.' }
                }
            } else {
                return { error: { status: 404, message: 'You cannot delete this transaction as it does not belong to you.' } }
            }
        } else {
            return { error: { status: 404, message: 'Transaction not found.' } }
        }
    }
}
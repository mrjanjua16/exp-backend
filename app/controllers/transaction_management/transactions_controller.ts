import { TransactionService } from '#services/transaction_management/transaction_service';
import { createTransactionValidator } from '#validators/transaction_management/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
    async create({ request, auth, response }: HttpContext) {
        try {
            const valid_transaction = await request.validateUsing(createTransactionValidator);
            const { amount, categoryId } = valid_transaction;
            const transaction = await TransactionService.create(amount, categoryId, auth.user?.id || 1);
            return transaction;
        } catch (error) {
            if (error.code === '23505') {
                return response.conflict({
                    status: 409,
                    message: `Conflict: ${error.detail || 'Transaction already exists.'}`,
                    constraint: error.constraint,
                });
            } else if (error.code === '23503') {
                return response.badRequest({
                    status: 400,
                    message: `Foreign Key Violation: ${error.detail || 'Invalid reference found.'}`,
                    constraint: error.constraint,
                });
            } else {
                return response.badRequest({
                    status: 400,
                    code: error.code,
                    message: error.message || 'An unexpected error occurred',
                });
            }
        }
    }

    async list({ auth, response }: HttpContext) {
        if (auth.user) {
            const transactions = await TransactionService.list(auth.user?.id);
            return response.ok(transactions);
        } else {
            return response.badRequest('User does not exist.')
        }

    }

    async delete({ params, auth, response }: HttpContext) {
        try {
            if (auth.user) {
                const deleted_transaction = await TransactionService.delete(params.id, auth.user.id);
                return response.ok(deleted_transaction);
            } else {
                return response.badRequest('User does not exist.')
            }
        } catch (error) {
            return response.badRequest({
                status: 400,
                code: error.code,
                message: error.message || 'An unexpected error occurred',
            });
        }
    }
}
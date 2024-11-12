import Account from '#models/account'

export class AccountService {
  static async add(amount: number, date: number, userId: number) {
    const account = await Account.query().where('user_id', userId).andWhere('date', date).first()
    if (!account) {
      await Account.create({
        user_id: userId,
        balance: amount,
        date: date,
        created_by: userId,
      })
      return { message: 'Transaction added to Accounts.' }
    } else {
      await account
        .merge({
          balance: account.balance + amount,
        })
        .save()
      return { message: 'Transaction added to Accounts.' }
    }
  }
}

import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Default users
    await User.updateOrCreateMany('email', [
      {
        full_name: 'webmaster',
        email: 'webmaster@email.com',
        password: 'password123',
      },
      {
        full_name: 'admin',
        email: 'admin@email.com',
        password: 'password123',
      },
      {
        full_name: 'test user',
        email: 'test@email.com',
        password: 'password123',
      },
    ])
  }
}

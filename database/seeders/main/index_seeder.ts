import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class index_seeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    // Static seeders
    await this.runSeeder(await import('#database/seeders/static/initial_user_seeder'))
    await this.runSeeder(await import('#database/seeders/static/initial_category_seeder'))
  }
}

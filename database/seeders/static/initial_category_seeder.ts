import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { category } from '../../../app/constants/enum.js'

export default class extends BaseSeeder {
  async run() {
    // Initial categories
    const categories = [
      {
        name: "Rent",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Groceries",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Salary",
        type: category.INCOME,
        created_by: 1,
      },
      {
        name: "Side Hustel",
        type: category.INCOME,
        created_by: 1,
      },
      {
        name: "Utilities",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Entertainment",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Healthcare",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Investment",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Education",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Transportation",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Insurance",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Taxes",
        type: category.EXPENSE,
        created_by: 1,
      },
      {
        name: "Savings",
        type: category.INCOME,
        created_by: 1,
      },
      {
        name: "ROI",
        type: category.INCOME,
        created_by: 1,
      },
      {
        name: "Other",
        type: category.EXPENSE,
        created_by: 1,
      },
    ];

    // Check for duplicate names
    const uniqueNames = [...new Set(categories.map(category => category.name))];
    if (categories.length !== uniqueNames.length) {
      throw new Error('Duplicate category names found');
    }

    await Category.updateOrCreateMany('name', categories);
  }
}
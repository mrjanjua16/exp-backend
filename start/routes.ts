/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_management/auth_controller')
const CategoryController = () => import('#controllers/category_management/categories_controller')
const UserCategoriesController = () => import('#controllers/category_management/user_categories_controller')
const TransactionController = () => import('#controllers/transaction_management/transactions_controller')
const LedgerController = () => import('#controllers/ledger_management/ledger_controller')

router.group(() => { // /api
  router.group(() => { // /api/v1

    // Auth Management routes
    router.group(() => { // /api/v1/auth
      router.post('/signup', [AuthController, 'signup'])
      router.post('/login', [AuthController, 'login'])
      router.get('/', [AuthController, 'me'])
      router.post('/logout', [AuthController, 'logout'])
    })
      .prefix('auth')

    // Category Management routes
    router.group(() => { // /api/v1/cat
      router.post('/', [CategoryController, 'create'])
      router.get('/', [CategoryController, 'list'])
      router.patch('/:id', [CategoryController, 'update'])
      router.delete('/:id', [CategoryController, 'delete']) // Development use only
    })
      .prefix('cat')
      .use(middleware.auth({ guards: ['api'] }))

    // User Categories Management Routes
    router.group(() => {
      router.get('/', [UserCategoriesController, 'list'])
      router.post('/', [UserCategoriesController, 'add'])
      router.delete('/', [UserCategoriesController, 'remove'])
      router.delete('/all', [UserCategoriesController, 'removeAll'])
    })
      .prefix('user-cat')
      .use(middleware.auth({ guards: ['api'] }))

    // Transaction Management routes
    router.group(() => { // /api/v1/trn
      router.post('/', [TransactionController, 'create'])
      router.get('/', [TransactionController, 'list'])
      router.delete('/:id', [TransactionController, 'delete']) // Development use only
    })
      .prefix('trn')
      .use(middleware.auth({ guards: ['api'] }))

    // Ledger Management routes
    router.group(() => { // /api/v1/ldg
      router.post('/', [LedgerController, 'addPlanned'])
      router.post('/mnth', [LedgerController, 'listPerMonth'])
      router.post('/cat', [LedgerController, 'listPerCategory'])
    })
      .prefix('ldg')
      .use(middleware.auth({ guards: ['api'] }))

  })
    .prefix('/v1')

})
  .prefix('/api')

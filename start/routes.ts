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
const TransactionController = () => import('#controllers/transaction_management/transactions_controller')

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
      router.delete('/:id', [CategoryController, 'delete'])
    })
    .prefix('cat')
    .use(middleware.auth({ guards: ['api'] }))

    // Category Management routes
    router.group(() => { // /api/v1/cat
      router.post('/', [TransactionController, 'create'])
      router.get('/', [TransactionController, 'list'])
      router.delete('/:id', [TransactionController, 'delete'])
    })
    .prefix('tran')
    .use(middleware.auth({ guards: ['api'] }))

  })
  .prefix('/v1')

})
.prefix('/api')

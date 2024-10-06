/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_management/auth_controller')

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

  })
  .prefix('/v1')

})
.prefix('/api')

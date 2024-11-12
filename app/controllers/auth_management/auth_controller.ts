import User from '#models/user'
import { AuthService } from '#services/auth_management/auth_service'
import { LoginValidator, SignupValidator } from '#validators/auth_management/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    const valid_signup = await request.validateUsing(SignupValidator)
    const signup = await AuthService.signup(valid_signup)
    return response.created({
      message: 'Sign up successfully',
      data: signup,
    })
  }

  async login({ request, response }: HttpContext) {
    const valid_login = await request.validateUsing(LoginValidator)
    const login = await AuthService.login(valid_login)
    if (login?.error) {
      return response.status(login.error.status).send({
        message: login.error.message,
      })
    }
    const { token, user } = login
    return response.ok({
      token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({
      message: 'Logout successfully',
    })
  }

  async me({ auth, response }: HttpContext) {
    await auth.check()
    const user = auth.user
    if (!user?.deleted_by) {
      return response.ok(user)
    } else {
      return response.status(403).send({
        message: 'User is inactive. Please contact administrator.',
      })
    }
  }
}

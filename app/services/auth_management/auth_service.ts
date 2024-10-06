import User from "#models/user"

interface signup {
    full_name: string
    email: string
    password: string
}

interface login {
    email: string
    password: string
}

export class AuthService {
    static async signup(payload: signup) {
        const user = await User.create({
            full_name: payload.full_name,
            email: payload.email,
            password: payload.password
        });
        return {
            ...user.serializeAttributes(),
            created_by: undefined,
            updated_by: undefined,
            deleted_by: undefined,
            created_at: undefined,
            updated_at: undefined,
            deleted_at: undefined,
        }
    }

    static async login(payload: login) {
        const user = await User.verifyCredentials(payload.email, payload.password)
        if (user.deleted_by !== null || user.deleted_at !== null) {
            return {error: {status: 404, message: 'User is inactive, please contact administrator or create a new one.'}}
        }
        const token = await User.accessTokens.create(user, ['*'], { expiresIn: '1d'});
        const getUser = await User.findOrFail(user.id)
        return { token, user: getUser}
    }

    
}
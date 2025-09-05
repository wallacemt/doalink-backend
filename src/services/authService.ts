// import jwt from 'jsonwebtoken';
// import { ZodError } from 'zod';
// import { env } from '../env';

// import { Exception } from '../utils/exception';
// import { hashPassword, verifyPassword } from '../utils/hash';


// const jwtSecret = env.JWT_SECRET;

// const MAX_ATTEMPTS = 3;
// const LOCK_TIME = 30 * 60 * 1000;

// interface AttemptData {
//   attempts: number;
//   lastAttempt: number;
// }

// const attemptsCache: Record<string, AttemptData> = {};
export class AuthService {

  /**
   * Registers a new user by hashing the provided password and storing the user data.
   * @param userData - The data for the new user, including the password to hash.
   * @returns The created user data with a hashed password.
   * @throws Exception if the user data is not provided.
   */

   async registerUser(
    // userData: UserDataRequest
  ) {
    // if (!userData) throw new Exception('User data e requerido!', 400);
    // const user = await this.userRepository.findByEmail(userData.email);
    // if (user) throw new Exception('Email ja cadastrado!', 409);

    // try {
    //   userSchema.parse(userData);
    //   const hashedPassword = await hashPassword(userData.password);
    //   userData.password = hashedPassword;
    //   return await this.userRepository.createUser(userData);
    // } catch (e) {
    //   if (e instanceof ZodError) {
    //     throw new Exception(e.issues?.[0]?.message || "error for resgister user", 400);
    //   }
    //   throw new Exception(`Informe os dados corretamente: ${e}`, 400);
    // }
  }
  /**
   * Authenticates an existing user by verifying the provided password and returning the user's data with a JWT token.
   * @param email - The email of the user to authenticate.
   * @param password - The password to verify.
   * @returns The authenticated user data with a JWT token.
   * @throws Exception if the user is not found or if the password is invalid.
   */
   async login(
    // email: string,
    // password: string
  ) {
    // const user = await this.userRepository.findByEmail(email);

    // if (!user) throw new Exception('user não encontrado!', 404);
    // const data = attemptsCache[email] || {
    //   attempts: 0,
    //   lastAttempt: Date.now(),
    // };
    // if (
    //   data.attempts >= MAX_ATTEMPTS &&
    //   Date.now() - data.lastAttempt < LOCK_TIME
    // ) {
    //   throw new Exception(
    //     `Número máximo de tentativas excedido. Tente novamente em ${Math.ceil((LOCK_TIME - Date.now() + data.lastAttempt) / 1000 / 60)} minutos`,
    //     429
    //   );
    // }

    // const isValidPassword = await verifyPassword(user.password, password);

    // if (!isValidPassword) {
    //   attemptsCache[email] = {
    //     attempts: data.attempts + 1,
    //     lastAttempt: Date.now(),
    //   };

    //   throw new Exception(
    //     `Senha inválida, tentativas restantes: ${MAX_ATTEMPTS - data.attempts}`,
    //     401
    //   );
    // }

    // delete attemptsCache[email];
    // const token = jwt.sign(
    //   { id: user.id, email: user.email },
    //   jwtSecret as string,
    //   { expiresIn: '7d' }
    // );

    // return { ...user, token };
  }
}

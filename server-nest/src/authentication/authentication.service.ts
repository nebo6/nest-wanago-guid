import bcrypt from 'bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UserService } from '../user/user.service'
import { PostgresErrorCode } from 'database/postgresErrorCode.enum'

export class AuthenticationService {
	constructor(private readonly userService: UserService) {}

	public async register(registrationData: RegisterDto) {
		const hashedPassword = await bcrypt.hash(registrationData.password, 10)
		try {
			const createdUser = await this.userService.create({
				...registrationData,
				password: hashedPassword,
			})
			createdUser.password = undefined
			return createdUser
		} catch (error) {
			if (error?.code === PostgresErrorCode.UniqueViolation) {
				throw new HttpException(
					'User with that email already exists',
					HttpStatus.BAD_REQUEST,
				)
			}
			throw new HttpException(
				'Something went wrong',
				HttpStatus.INTERNAL_SERVER_ERROR,
			)
		}
	}
}

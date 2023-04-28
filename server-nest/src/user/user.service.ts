import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import bcrypt from 'bcrypt'
import { User } from './user.entity'
import { CreateUserDto } from './dto/createUser.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async getByEmail(email: string) {
		const user = await this.usersRepository.findOne({ where: { email } })
		if (user) {
			return user
		}
		throw new HttpException(
			'User with this email does not exist',
			HttpStatus.NOT_FOUND,
		)
	}

	async create(userData: CreateUserDto) {
		// const { password } = userData
		// const hash = await bcrypt.hash(password, 10)
		// const isPasswordMatching = await bcrypt.compare(password, hash)

		const newUser = await this.usersRepository.create(userData)
		await this.usersRepository.save(newUser)
		return newUser
	}
}

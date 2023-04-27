import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdatePostDto } from './dto/updatePost.dto'
import { CreatePostDto } from './dto/createPost.dto'
import { Post } from './post.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post)
		private readonly postRepository: Repository<Post>,
	) {}

	// Get all posts data
	public async getAllPosts() {
		return await this.postRepository.find()
	}

	// Get post data by ID
	public async getPostById(id: number) {
		const post = await this.postRepository.findOne({
			where: { id },
		})
		if (post) return post
		throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
	}

	// Create new post
	public async createPost(post: CreatePostDto) {
		const newPost = await this.postRepository.create(post)
		await this.postRepository.save(newPost)

		return newPost
	}

	// Update post data
	public async updatePost(id: number, post: UpdatePostDto) {
		await this.postRepository.update(id, post)
		const updatePost = await this.postRepository.findOne({ where: { id } })
		if (updatePost) return updatePost
		throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
	}

	// Delete post by ID
	public async deletePost(id: number) {
		const deleteResponse = await this.postRepository.delete(id)
		if (!deleteResponse.affected)
			throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
	}
}

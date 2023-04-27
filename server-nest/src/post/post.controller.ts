import {
	Body,
	Controller,
	Get,
	Post,
	Param,
	ParseIntPipe,
	Res,
	Delete,
	Put,
} from '@nestjs/common'
import { Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PostService } from './post.service'
import { CreatePostDto } from './dto/createPost.dto'
import { UpdatePostDto } from './dto/updatePost.dto'

@Controller('posts')
export class PostController {
	constructor(private readonly PostService: PostService) {}

	@Get('/')
	async getAllPosts(@Res() res: Response) {
		const posts = this.PostService.getAllPosts()
		return res.send(posts)
	}

	@Get('/:id')
	async getPostById(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		const post = this.PostService.getPostById(Number(id))
		return res.send(post)
	}

	@Post('/')
	async createPost(@Body() post: CreatePostDto, @Res() res: Response) {
		const createdPost = this.PostService.createPost(post)
		res.send(createdPost)
	}

	@Put('/:id')
	async replacePost(
		@Param('id', ParseIntPipe) id: number,
		@Body() post: UpdatePostDto,
		@Res() res: Response,
	) {
		const replacedPost = this.PostService.updatePost(id, post)
		res.send(replacedPost)
	}

	@Delete('/:id')
	async deletePost(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		this.PostService.deletePost(id)
		res.sendStatus(200)
	}
}

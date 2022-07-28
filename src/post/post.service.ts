import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { User } from 'src/entity/user.entity';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private fileService: FileService,
  ) {}

  async savePost(createPostDto: CreatePostDto, image: any, author: User) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.save({
      ...createPostDto,
      author,
      image: fileName,
    });
    return post;
  }

  async findPostById(id: number) {
    const postInfo = await this.postRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    return postInfo;
  }

  async findPostsByUser(user: User) {
    const posts: Post[] = await this.postRepository.find({
      where: { author: user },
    });
    return posts;
  }

  async updatePostByUser(id: number, createPostDto: CreatePostDto, user: User) {
    const updatedPost = await this.postRepository.update(
      { id, author: user },
      createPostDto,
    );

    return updatedPost;
  }

  async deletePostByUser(id: number, user: User) {
    const deletedPost = await this.postRepository.delete({ id, author: user });
    return deletedPost;
  }
}

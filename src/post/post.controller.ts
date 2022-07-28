import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image,
    @Request() req,
  ) {
    return this.postService.savePost(createPostDto, image, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('search')
  getPostById(@Query('id') id: number) {
    return this.postService.findPostById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('myPosts')
  getAllPostsByUser(@Request() req) {
    return this.postService.findPostsByUser(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ) {
    return this.postService.updatePostByUser(id, createPostDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: number, @Request() req) {
    return this.postService.deletePostByUser(id, req.user);
  }
}

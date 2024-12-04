import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  // GET /posts
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // POST /posts
  @Post()
  create(@Body() postDto: any) {
    return this.postsService.create(postDto);
  }

  // GET /posts/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  // PUT /posts/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() postDto: any) {
    return this.postsService.update(id, postDto);
  }

  // Delete /posts/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}

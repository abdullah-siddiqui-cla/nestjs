import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async create(postDto: any): Promise<Post> {
    const post = new this.postModel(postDto);
    return post.save();
  }

  async findById(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, postDto: any): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, postDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}

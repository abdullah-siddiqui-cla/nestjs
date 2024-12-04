import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = new this.userModel({ ...userDto, password: hashedPassword });
    return user.save();
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      return { token };
    }
    throw new Error('Invalid credentials');
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Meeting, User } from 'src/user/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './typeorm/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Product,Meeting]),
  JwtModule.register({secret:'secretKey',signOptions:{expiresIn: '100s'}})],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

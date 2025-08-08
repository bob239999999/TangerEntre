import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './User/user.module';
import { TaskModule } from './Task/task.module';
import { ProjectModule } from './Project/project.module';
import { MembershipModule } from './Membership/membership.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/project'), UserModule, TaskModule, ProjectModule, MembershipModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

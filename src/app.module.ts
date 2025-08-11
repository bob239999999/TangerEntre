import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './User/user.module';
import { TaskModule } from './Task/task.module';
import { ProjectModule } from './Project/project.module';
import { MembershipModule } from './Membership/membership.module';
import { AuthModule } from './Auth/auth.module';
import { SongModule } from './Messaging/Song/song.module';

import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),

    UserModule, TaskModule, ProjectModule, MembershipModule, AuthModule, SongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TaskService } from './../Task/task.service';
import { TaskController } from './../Task/task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),  // Register Task schema with Mongoose
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [
    TaskService,
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
  ]
})
export class TaskModule { }

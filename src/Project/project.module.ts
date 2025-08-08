import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './project.schema';
import { TaskModule } from '../Task/task.module';
import { MembershipModule } from 'src/Membership/membership.module';
import { MembershipDto } from 'src/Membership/membership.dto';
import { Membership, MembershipSchema } from 'src/Membership/membership.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'Membership', schema: MembershipSchema }
    ]),
    TaskModule,
    MembershipModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule { }
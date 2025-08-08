import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { MembershipSchema } from './membership.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Membership', schema: MembershipSchema }])
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService]
})
export class MembershipModule { }
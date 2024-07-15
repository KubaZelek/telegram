import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { User } from './entities/users.entity';
import { Message } from './entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}

import { Controller, Post, Get, Body, Query, Headers, Param } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.telegramService.storeUser(createUserDto);
  }

  // @Get('user')
  // async getUser(
  //   @Headers('auth-token') authToken: string,
  //   @Query('name') name: string,
  // ) {
  //   return this.telegramService.getUser(auParamthToken, name);
  // }
  @Get('message')
  async sendMessageGet(@Query('sender') sender: string, @Query('message') message: string, @Query('receiver') receiver: string) {
    return this.telegramService.handleMessage({ sender, message, receiver });
  }

  @Post('message')
  async sendMessagePost(@Body() createMessageDto: CreateMessageDto) {
    return this.telegramService.handleMessage(createMessageDto);
  }
}

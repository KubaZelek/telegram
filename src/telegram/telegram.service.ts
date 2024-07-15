import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Telegraf } from 'telegraf';
import { User } from './entities/users.entity';
import { Message } from './entities/messages.entity';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger();
  private readonly SECURITY_CODE = 'k3nm3RM7QL7BqutW';

  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
    @InjectRepository(Message)
    private readonly MessageRepo: Repository<Message>,
  ) {}

  async storeUser(createUserDto: CreateUserDto): Promise<void> {
    const getUser = await this.UserRepo.findOne({ where: { name: createUserDto.name } });

    if (getUser.name == createUserDto.name || getUser.token == createUserDto.token) {
      throw new HttpException({ status: 'ERR', message: 'Ten user juz istnieje' }, HttpStatus.BAD_REQUEST);
    }

    console.log(getUser);
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.token = createUserDto.token;
    await newUser.save();
  }

  async sendMessage(token: string, message: string, receiver: string) {
    const bot = new Telegraf(token);
    await bot.telegram.sendMessage(receiver, message);
  }

  async handleMessage(createMessageDto: CreateMessageDto) {
    const { sender, message, receiver } = createMessageDto;
    console.log(sender);

    const senderUser = await this.UserRepo.findOne({ where: { name: sender } });
    if (!senderUser) {
      throw new HttpException({ status: 'ERR', message: 'Podaj poprawna wartosc sender' }, HttpStatus.BAD_REQUEST);
    }

    const newMessage = new Message();
    newMessage.sender = senderUser.name;
    newMessage.message = createMessageDto.message;
    newMessage.receiver = createMessageDto.receiver;

    await newMessage.save();

    console.log(senderUser.token);
    await this.sendMessage(senderUser.token, message, receiver);
  }
}

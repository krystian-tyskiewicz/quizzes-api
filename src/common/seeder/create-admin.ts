import { Command } from 'commander';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import roles from '../../auth/roles/user.roles';

async function bootstrap() {
  const program = new Command();

  program
    .option('--email <email>', 'Email address')
    .option('--firstName <firstName>', 'First name')
    .option('--lastName <lastName>', 'Last name')
    .option('--password <password>', 'Password');

  program.parse(process.argv);

  const adminDto = program.opts() as CreateUserDto;

  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);

  await usersService.create(adminDto, roles.ADMIN);
  await app.close();
}

bootstrap();

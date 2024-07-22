import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { users, user, userDto } from '../common/mock/users';

describe('UsersController', () => {
  let controller: UsersController;

  const usersService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue(users),
    findOne: jest.fn().mockResolvedValue(user),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a new user', async () => {
    await controller.create(user);

    expect(usersService.create).toHaveBeenCalledWith(user);
  });

  it('should update a user', async () => {
    const userToUpdateId = user.id;

    await controller.update(userToUpdateId, userDto);

    expect(usersService.update).toHaveBeenCalledWith(userToUpdateId, userDto);
  });

  it('should return users', async () => {
    expect(await controller.findAll()).toEqual(users);
  });

  it('should return user', async () => {
    expect(await controller.findOne(user.id)).toEqual(user);
  });

  it('should remove a user', async () => {
    await controller.remove(user.id);

    expect(usersService.remove).toHaveBeenCalledWith(user.id);
  });
});

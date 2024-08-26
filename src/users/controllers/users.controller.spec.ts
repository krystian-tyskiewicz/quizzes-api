import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { users, user, updateUserDto } from '../../common/mock/users';

describe('UsersController', () => {
  let controller: UsersController;

  const usersService = {
    getOne: jest.fn().mockResolvedValue(user),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue(users),
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

  it('should get user profile', async () => {
    const request = { user: { id: '1' } };

    const response = await controller.getProfile(request);

    expect(usersService.getOne).toHaveBeenCalledWith(request.user.id);
    expect(response).toEqual(user);
  });

  it('should update a user', async () => {
    const request = { user: { id: '1' } };

    await controller.update(request, updateUserDto);

    expect(usersService.update).toHaveBeenCalledWith(
      request.user.id,
      updateUserDto,
    );
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

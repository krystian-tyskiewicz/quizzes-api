import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { repositoryMockFactory } from '../../common/mock/repository';
import {
  users,
  user,
  createUserDto,
  updateUserDto,
} from '../../common/mock/users';
import roles from '../roles/user.roles';

describe('UsersService', () => {
  let service: UsersService;
  const repositoryMock = repositoryMockFactory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should throw HttpException if email already exists', async () => {
    repositoryMock.findOneBy.mockReturnValue(user);

    expect(async () => await service.create(user)).rejects.toThrow(
      new HttpException('Email already exists', HttpStatus.BAD_REQUEST),
    );
  });

  it('should create a new user', async () => {
    repositoryMock.findOneBy.mockReturnValue(null);

    await service.create(createUserDto);

    expect(repositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        role: roles.STANDARD,
      }),
    );
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should find user by email', async () => {
    repositoryMock.findOneBy.mockReturnValue(user);

    expect(await service.findByEmail(user.email)).toEqual(user);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
      email: user.email,
    });
  });

  it('should throw an error when user not found', async () => {
    const id = user.id;

    repositoryMock.findOneBy.mockReturnValue(null);

    expect(async () => await service.getOne(id)).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });

  it('should return user', async () => {
    const id = user.id;

    repositoryMock.findOneBy.mockReturnValue(user);

    expect(await service.getOne(id)).toEqual(user);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id });
  });

  it('should throw an error when user not found', async () => {
    const userToUpdateId = user.id;

    repositoryMock.findOneBy.mockReturnValue(null);

    expect(
      async () => await service.update(userToUpdateId, updateUserDto),
    ).rejects.toThrow(new NotFoundException('User not found'));
  });

  it('should update a user', async () => {
    const userToUpdateId = user.id;

    repositoryMock.findOneBy.mockReturnValue(user);

    await service.update(userToUpdateId, updateUserDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: userToUpdateId,
        ...updateUserDto,
      }),
    );
  });

  it('should return users', async () => {
    repositoryMock.find.mockReturnValue(users);

    expect(await service.findAll()).toEqual(users);
    expect(repositoryMock.find).toHaveBeenCalled();
  });

  it('should remove a user', async () => {
    const userToDeleteId = user.id;

    await service.remove(userToDeleteId);

    expect(repositoryMock.delete).toHaveBeenCalledWith(userToDeleteId);
  });
});

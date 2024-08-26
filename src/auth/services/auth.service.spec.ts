import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/services/users.service';
import { user, createUserDto } from '../../common/mock/users';

type CompareType = (data: string, encrypted: string) => Promise<boolean>;
const mockedCompare = jest.mocked<CompareType>(compare);

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  const accessToken = 'access-token';
  let service: AuthService;

  const usersService = {
    create: jest.fn().mockResolvedValue(user),
    findByEmail: jest.fn().mockResolvedValue(user),
    getOne: jest.fn().mockResolvedValue(user),
  };

  const jwtService = {
    sign: jest.fn().mockReturnValue(accessToken),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const response = await service.register(createUserDto);

    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    expect(response).toEqual(user);
  });

  it('should return null if there is not user', async () => {
    usersService.findByEmail.mockResolvedValue(null);

    const response = await service.login('invalid.email@test.com', 'password');

    expect(response).toEqual(null);
  });

  it('should return null when password does not match', async () => {
    mockedCompare.mockResolvedValue(false);
    usersService.findByEmail.mockResolvedValue(user);

    const response = await service.login(user.email, user.password);

    expect(response).toEqual(null);
  });

  it('should login user correctly when password match', async () => {
    mockedCompare.mockResolvedValue(true);
    usersService.findByEmail.mockResolvedValue(user);

    const response = await service.login(user.email, user.password);

    expect(response).toEqual(user);
  });

  it('should sign a token', async () => {
    expect(await service.signToken(user)).toEqual({ accessToken });
  });

  it('should verify payload', async () => {
    const payload = { sub: user.id };
    usersService.getOne.mockResolvedValue(user);

    expect(await service.verifyPayload(payload)).toEqual(user);
  });
});

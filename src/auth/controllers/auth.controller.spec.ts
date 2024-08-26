import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { user, createUserDto } from '../../common/mock/users';

describe('AuthController', () => {
  let controller: AuthController;
  const signTokenResponse = { accessToken: 'access-token' };

  const authService = {
    register: jest.fn().mockResolvedValue(user),
    signToken: jest.fn().mockResolvedValue(signTokenResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('register', async () => {
    const response = await controller.register(createUserDto);

    expect(authService.register).toHaveBeenCalledWith(createUserDto);
    expect(response).toEqual(user);
  });

  it('login', async () => {
    const request = { user };
    const response = await controller.login(request);

    expect(authService.signToken).toHaveBeenCalledWith(request.user);
    expect(response).toEqual(signTokenResponse);
  });
});

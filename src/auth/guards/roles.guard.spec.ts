import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { user } from '../../common/mock/users';

describe('AuthService', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let context: any;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
    context = {
      getHandler: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user }),
      }),
    };
  });

  it('should return false when there are no proper roles', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['OTHER_ROLE']);

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false when there are no proper roles', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['STANDARD']);

    expect(guard.canActivate(context)).toBe(true);
  });
});

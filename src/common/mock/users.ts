import { User } from '../../users/entities/user.entity';
import roles from '../../users/roles/user.roles';

export const users: User[] = [
  {
    id: 1,
    email: 'john.doe@test.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password-hash',
    role: roles.STANDARD,
  },
  {
    id: 2,
    email: 'ava.smith@test.com',
    firstName: 'Ava',
    lastName: 'Smith',
    password: 'password-hash',
    role: roles.STANDARD,
  },
];

export const user = users[0];

export const admin = {
  id: 1,
  email: 'admin@test.com',
  firstName: 'Admin',
  lastName: 'Admin',
  password: 'password-hash',
  role: roles.ADMIN,
};

export const createUserDto = {
  email: 'james.williams@test.com',
  password: 'password-hash',
  firstName: 'James',
  lastName: 'Williams',
};

export const updateUserDto = {
  firstName: 'James',
  lastName: 'Williams',
};

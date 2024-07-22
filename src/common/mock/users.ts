import { User } from '../../users/user.entity';

export const users: User[] = [
  {
    id: 1,
    email: 'john.doe@test.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 2,
    email: 'ava.smith@test.com',
    firstName: 'Ava',
    lastName: 'Smith',
  },
];

export const user = users[0];

export const userDto = {
  email: 'james.williams@test.com',
  firstName: 'James',
  lastName: 'Williams',
};

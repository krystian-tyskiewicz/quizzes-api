import { Repository } from 'typeorm';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn(),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

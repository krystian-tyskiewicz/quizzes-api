## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker-compose build
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setting up pgAdmin and PostgreSQL Server

1. Open PgAdmin in the web browser by visiting http://localhost:5050
2. Log in using your email and password in the .env file
3. In the left-hand sidebar, right-click on Servers and select Register -> Server
4. In the General tab, provide a server name of our choice
5. In the Connection tab, fill in the following details based on .env file:
- Host name/address: db
- Port: 5432
- Maintenance database: postgres
- Username: postgres
- Password: postgres
6. Click Save

![Screenshot](https://github.com/krystian-tyskiewicz/quizzes-api/assets/10433595/9a72f5da-98a8-41f0-aa58-9529996c8793)

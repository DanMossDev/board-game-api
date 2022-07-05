# <center> BeeGee (Board Games) API </center>

### <center> https://beegee-api.herokuapp.com/ </center>

## Intro
---
This API will allow users to view, update, and edit a variety of information pertaining to board games, including:
- Rewiews
- Comments on reviews
- Users
- Categories of games

For security reasons, .env variables have been obscured in this repository - as such you will have to include your own .env.development file in the following format:

```
PGDATABASE=nc_games
PGPASSWORD="your-password"
```

Users on Linux must include the password variable; those on Mac may find it unneccesary.

If you wish to try out/expand upon the test suite, you will need to also include a .env.test file as follows:

```
PGDATABASE=nc_games_test
PGPASSWORD="your-password"
```

Assuming you have [Node and NPM](https://nodejs.org/) installed (devloped for v16.15.1 & v8.11.0 respectively), installing dependencies should be as simple as running the bash command:
```
npm install
```

From there, you will want to have access to a [PSQL app](https://postgresapp.com/) and run the following commands to get started.
```
npm run setup-dbs
npm run seed
```

And if you want to run the test suite, simply use the command:
```
npm test
```

Thanks, and enjoy!

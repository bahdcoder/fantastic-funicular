## Random company app
This random company application is an e-commerce store, helping brands manage their products and customers, and also do some cool things such as launch sales across a number of products easily.

At the moment, we're still in the early stages of development, and we have no authentication or authorisation setup yet. We have a basic architecture for our platform ready, with 4 endpoints as a sample to show how this product will be developed and maintained in future. We're very excited to present this initial work to our investors.

### Features
With our API, companies can register new accounts (`POST /companies`), add new products to their accounts (`POST /companies/<id>/products`), fetch all products from their account (`GET /companies/<id>/products`). An administrator may also see all companies using the `GET /companies` endpoint.

### Setup application
- Clone this repository using the following command:

```bash
git clone https://github.com/bahdcoder/fantastic-funicular.git
```

- Install project dependencies using the command: `yarn`
- Add a `.env` file at the root of the project. A sample file can be seen in the `.env.example` file.
- By default the project connects to a postgresql database. You may want to go faster with another database by changing the provider in the `prisma/schema.prisma` file, and updating the `.env` file to provide the correct environment variable.
- The best way to test all endpoints is to run the integration tests using `yarn test`.
- Build the project for production using `yarn build`.
- Start the application in production mode using `yarn start`.

### Tech stack
The API is powered by Express.js, and [Prisma](https://prisma.io) is used for the database and migrations layer. [Jest](https://jest.io) is used for automated testing.

### Future project improvements
We plan to make a lot of changes in future on this project. Some of them are:
- Include authentication, role based access control and authorisation using JWT
- Improve Error reporting (not just Pino logging) with Sentry / New Relic
- Improve rate limiting from the in memory store to a separate Redis database.
- Include basic API versioning for the possible future.
- Include extensive API documentation
- Setup easy docker workflow (started, but my docker is rusty, its been years haha.)
- Add continuous integration and deployment with Github actions
- Add npm package vulnerability checks using Snyk.

### Similar projects
I am the core maintainer and creator of [Tensei.js](https://github.com/tenseijs/tensei), and at its core, its an Express application, but it includes a CMS, full authentication and authorization system with role based access control, two-factor authentication, email validation, rest and graphql apis and a lot more. I use Typescript, Nodejs, MikroORM and React for this project.

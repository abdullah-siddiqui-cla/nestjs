# NestJS Hands-On Exercise
## Primary Objective: Implement Posts CRUD
### Step 1: Scaffold the Application
- Use the Nest CLI to create a new project:
```
nest new nest-posts-app
```
- Choose npm as your package manager.
- Navigate into the project folder: cd `nest-posts-app`.
- Install dependencies for MongoDB:
```
npm install @nestjs/mongoose mongoose
```

### Step 2: Create the Posts Module
- Generate the posts module:
```
nest generate module posts
```
- Verify that a `posts` folder is created inside `src`, with a `posts.module.ts` file.

### Step 3: Create the Posts Controller
- Generate the posts controller:
```
nest generate controller posts
```
- Open `posts.controller.ts` and ensure the basic structure is set up.

### Step 4: Create the Posts Service
- Generate the posts service:
```
nest generate service posts
```
- Open `posts.service.ts`. This file will handle the business logic.

### Step 5: Add a Post Schema and Fetch All Posts
- Define a `Post` schema inside the posts service:
  - Create a new file post.schema.ts inside the posts folder.
  - Define a schema with fields title (string) and body (string).
  - Use @nestjs/mongoose decorators to create the schema.
- In the posts.service.ts file:
  - Add a method `findAll()` to fetch all posts from the database.
- In the posts.controller.ts file:
  - Create a `GET /posts` route and call `findAll()` from the service.
- Test the `GET /posts` route using Postman.

### Step 6: Add CRUD Operations for Posts
- Add the following methods to the PostsService:
  - create(postDto)
  - findById(id)
  - update(id, updatedPostDto)
  - delete(id)

- Connect these methods to respective routes in the `posts.controller.ts`:
  - `POST /posts`: Add a new post.
  - `GET /posts/:id`: Fetch a post by ID.
  - `PUT /posts/:id`: Update a post by ID.
  - `DELETE /posts/:id`: Delete a post by ID.
- Test all routes using Postman.

## Bonus Objective: Add User Authentication
### Step 1: Create the User Module
- Generate the users module:
```
nest generate module users
```
- Generate the users controller:
```
nest generate controller users
```
- Generate the users service:
```
nest generate service users
```
### Step 2: Define the User Schema
- Create a `user.schema.ts` file inside the users folder.
- Define a schema with:
  - username (string, unique, required).
  - password (string, required).
- Integrate the schema with Mongoose.

### Step 3: Implement the Registration Route
- In `users.controller.ts`, create a `POST /users` route to register a new user.
- Use bcrypt to hash the password before saving.
- Save the user in the database using the service.
- Test the route in Postman.

### Step 4: Implement the Login Route
- In `users.controller.ts`, create a `POST /users/login` route to log in a user.
  - Verify the password using `bcrypt.compare()`.
  - Generate a JWT token with the user ID in the payload using `@nestjs/jwt`.
- Return the JWT token in the response.

### Step 5: Protect Posts Routes
- Create an `auth.guard.ts` file in a guards folder:
  - Use `@nestjs/passport` to implement JWT-based authentication.
  - Validate the token and attach the user to the request object.
- Protect all posts routes by applying the guard:
  - Use `@UseGuards(AuthGuard('jwt'))` at the controller level.
- Test accessing posts routes with and without a token.

## Testing Instructions
Test the following scenarios in Postman:
- Register a new user (POST /users).
- Log in with the user (POST /users/login) to get a token.
- Access protected posts routes with and without the token.

## Hints
- Use environment variables for the JWT secret (`JWT_SECRET`) and MongoDB URI (`MONGO_URI`).
- Refer to NestJS documentation for additional help on modules, controllers, and guards.
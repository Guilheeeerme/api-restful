## <p>About</p>

It is an application where registered users can register their recipes so that they are available to other users. Each user can interact on the recipes, favoring or evaluating.

## <p>Routes</p>

| Route    | HTTP Method | Description  |
| :------- | :---------: | :----------: |
| `/users` |    POST     | Create user. |
| `/auth`  |    POST     | User login.  |

## <p>Routes that the user needs to be logged in, contains Jsonwebtoken Middleware</p>

| Route                   | HTTP Method |                             Description                              |
| :---------------------- | :---------: | :------------------------------------------------------------------: |
| `/users`                |     GET     |                             List users.                              |
| `/users/:id`            |     GET     |                             List a user.                             |
| `/users`                |     PUT     | Update a user (No parameter required because the user is logged in). |
|                         |             |                                                                      |
| `/categories`           |     GET     |                           List categories.                           |
|                         |             |                                                                      |
| `/attachments`          |    POST     |                Upload attachments (recipe or avatar).                |
|                         |             |                                                                      |
| `/recipes`              |     GET     |                            List recipes.                             |
| `/recipes/:id`          |     GET     |                            List a recipe.                            |
| `/recipes`              |    POST     |                            Create recipe.                            |
| `/recipes:id`           |     PUT     |                           Update a recipe.                           |
| `/recipes:id`           |   DELETE    |                           Delete a recipe.                           |
|                         |             |                                                                      |
| `/favorites/:recipe_id` |    POST     |                          Favorite a recipe.                          |
| `/favorites`            |     GET     |            List favorite recipes (of the logged in user).            |
| `/favorites/:recipe_id` |   DELETE    |                   Remove a recipe from favorites.                    |
|                         |             |                                                                      |
| `/ratings/:recipe_id`   |   DELETE    |                 Evaluate a recipe (between 1 and 5).                 |

## Technologies used

- Node.js
- Express
- JavaScript
- PostgreSQL
- Sequelize
- Bcryptjs
- Jsonwebtoken
- Multer
- Yup
- Dotenv

## <p>🔥 Installing</p>

### <p>First Clone this repository</p>

```shell
$ git clone https://github.com/Guilheeeerme/api-restful.git
```

### <p>Set as environment variables</p>

```shell
Based on the ".env.example" file create your ".env" file and set up a database connection and I also created a secret token.
```

### <p>Install the dependencies</p>

```shell
$ npm install
```

### <p>Run migrations and seeders</p>

```sheel
$ npm run db:migrate
$ npm run db:seed
```

### <p>Run Project</p>

```sheel
$ npm run start
```

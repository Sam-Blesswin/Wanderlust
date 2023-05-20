# Wanderlust

A sample project to learn backend tech stack (Express - Node - MongoDB)

To run the project: "npm run start:dev"

package.json is configured to run "nodemon server.js"

## Packages

### Express

command : "npm i express"

Express is a node.js framework with high level of abstraction.

### Morgan

command : "npm i morgan"

morgan is a popular middleware for Node.js web applications, primarily used for HTTP request logging. It provides a simple and customizable logging solution that can be easily integrated into Express.js or other Node.js frameworks.

### Dotenv

command : "npm i dotenv"

The dotenv npm package is used to load environment variables from a .env file into Node.js applications, simplifying the management of configuration settings.

### ESLint

command : "npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev"

ESLint is a customizable linter that enforces code style and identifies errors.It can be configured with various rulesets to fit the specific requirements of a project.

### Prettier

Prettier is a code formatter that ensures consistent formatting.

### Mongoose

Mongoose simplifies working with MongoDB databases by providing an object modeling framework and tools for data validation, querying, and manipulation.

## CRUD : HTTP METHODS

REST Methods

- CREATE : POST
- READ : GET
- UPDATE : PUT / PATCH
- DELETE : DELETE

## Endpoints

In an API, an endpoint is a URL that clients can use to request information or perform an action. It's like a door or entrance to access a specific resource or feature of the API.

Here are some examples of API endpoints:

GET /users - This endpoint lets clients retrieve a list of users from the API. For instance, a client can request this endpoint to get a list of users' names, emails, and other details.

POST /users - This endpoint is used to create a new user in the API. The client sends a POST request with the new user's details, such as name and email, and the API responds with a success message.

PUT /users/{id} - This endpoint updates an existing user's details in the API. The client sends a PUT request with the user's ID and updated details, and the API responds with a success message.

DELETE /users/{id} - This endpoint deletes an existing user from the API. The client sends a DELETE request with the user's ID, and the API responds with a success message.

## Response codes

- 200 - Success
- 201 - Created
- 204 - No Content
- 400 - Bad Request
- 404 - Not Found
- 500 - Internal Server Error

## Middleware

Middlewares in HTTP servers are functions that process requests before they reach the final handler function. They are used to extract data from the request, authenticate the request, or perform other pre-processing tasks. They are called "middlewares" because they sit in the middle between the request and the final handler function.

Middleware stack
When a request is received by a server, it passes through the middleware stack, where each middleware function can modify the request or response objects, perform additional processing, or invoke the next middleware function in the stack. This allows for modular and reusable code that can handle common tasks such as authentication, logging, error handling, and more.

Order of Execution
In Node.js, middleware functions are executed in the order they are defined or added to the application's middleware stack. The order of execution is important as it determines how the request flows through the middleware functions and how each middleware can manipulate the request and response objects.

## MongoDb Schema

MongoDB schema is a flexible structure that defines the organization and layout of data stored in MongoDB. It consists of collections, documents, and fields, allowing for dynamic and schema-less data modeling.

## MVC Architecture

MVC (Model-View-Controller) is a design pattern used in backend programming to organize code into three components:

1. Model: Represents the data and business logic. It interacts with the database and defines the structure of the data.

2. View: Displays the data to the user. It generates the user interface and presents the information in a format that users can understand.

3. Controller: Handles user input and acts as a mediator between the Model and View. It receives requests from the user, retrieves or updates data from the Model, and updates the View accordingly.

For example, in a user registration system:

- Model: Defines the user data structure, validates input, and saves/retrieves data from the database.

- View: Displays the registration form and shows success/error messages to the user.

- Controller: Handles the registration request, validates the input, creates a new user record in the Model, and updates the View to show the appropriate response.

Using MVC helps separate concerns, makes code modular and easier to maintain, and enables multiple views to interact with the same underlying data without affecting each other.

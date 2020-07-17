# Nintendo Switch Shop
Boilerplate MERN stack | New Media Development | Artevelde University of Applied Sciences

# NMD MERN Template

Template for the course **Mobile Development II** specialisation **New Media Development** in the department **Graphical and Digital Media** within **Artevelde University College Ghent**.

Template consists of:

- Node.js
- Express
- React

## Getting Started

### MongoDb

https://cloud.mongodb.com/

### Server

Create a `.env`-file under the root of the server with the following contents:

```
NMD_BASELINE='Like Graphics Love Code' 
NODE_DOCS={generating documentation for Api} (true or false) 
NODE_ENV={your node environment} (development, production or staging)  
NODE_SERVER_HOST={your ip-addres or domainname} (ex.: 127.0.0.1, 192.168.0.6)  
NODE_SERVER_PORT={your port for the server} (ex.: 8080)  
NODE_SERVER_PROTOCOL={your port for the server} (ex.: 8080)  
MONGODB_CONNECTION={your mongodb connection string}
AUTH_BCRYPT_SALT={your salt value for passwords} (ex.: 10) 
AUTH_JWT_SECRET={your JWT secret} (ex.: gdm_nmd_mobdev2) 
AUTH_JWT_SESSION={your JWT session true or false} 
AUTH_FACEBOOK_CLIENT_ID={your Facebook Client id} 
AUTH_FACEBOOK_CLIENT_SECRET={your Facebook Client secret} 
```

### React Client

Create a `.env`-file under the `react-client` folder following contents:

```
REACT_APP_API_URL=/api
```

### Installing

Under the root of the project execute:

```
yarn install
```

### Scripts

#### Running the Express-server and React-client in development side-by-side

Under the root execute:

```
yarn watch:all
```

#### Running the Express-server with integrated React-client in development

Under the root execute:

First build the React-client (you have to do this after changes in de react-client code)

```
yarn build:react-client
```

Start the Express-server in development

```
yarn watch
```

#### Build the complete project

Under the root execute:

```
yarn build:clean
```

Serve the compiled project:

```
yarn serve:build
```

## API Specification

### Urls

- [Swagger Ui for Express](http://{your domain}:{your port]/api/v1/docs/)
- [ReDoc](http://{your domain}:{your port]/docs/)

## Client

### Urls

- Public
  - Home: http://{your domain}:{your port]
  - News: http://{your domain}:{your port]/posts
  - Post Detail: http://{your domain}:{your port]/posts/{post id}
- Admin
  - Home: http://{your domain}:{your port]/admin
  - Blog List: http://{your domain}:{your port]/admin/blogs
  - Blog Create: http://{your domain}:{your port]/admin/blogs/create
  - Blog Edit: http://{your domain}:{your port]/admin/blogs/{blog id}/edit
  - Categories List: http://{your domain}:{your port]/admin/categories
  - Category Create: http://{your domain}:{your port]/admin/categories/create
  - Category Edit: http://{your domain}:{your port]/admin/categories/{category id}/edit
  - Posts List: http://{your domain}:{your port]/admin/posts
  - Post Create: http://{your domain}:{your port]/admin/posts/create
  - Post Edit: http://{your domain}:{your port]/admin/posts/{post id}/edit

## Built With

- Node.js
- Express
- React

## Authors

### Boilerplate author
- Philippe De Pauw - Waterschoot | [drdynscript](https://github.com/drdynscript)

### Project author
- Arne Six

## License

This project is licensed under the Apache License - see the LICENSE file for details


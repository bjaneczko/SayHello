# SayHello
Web application which allows you to chat with other users - directly or by
creating a group.

## Info

Currently I am adding unit tests for components and mocking to test API responses.

# Demo
[Click to checkout live version](https://say-hello-coo0.onrender.com/)
```
Email: user@test.com
Password: password
```


# Built With
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - Managing state in app
* [Node.js](nodejs.org) - JavaScript enviroment
* [Express](https://expressjs.com/) - Node.js web application framework
* [MongoDB](https://www.mongodb.com/) - Database for modern apps
* [Emotion](https://emotion.sh/docs/introduction) - library designed for writing css styles with JavaScript
* [Socket.io](https://emotion.sh/docs/introduction) - library that enables communication between a client and a server

# Installation
Intalling all dependencies for server (/backend)

```
npm install
```

Intalling all dependencies for client side. Before that make sure you are in the client folder ( /frontend )

```
npm install
```

Running server side with package nodemon (/backend)

```
npm run server 
```

Running client side. Before that make sure you are in the client folder ( /frontend )

```
npm start 
```

# Setting up

Create .env file in root and fill as shown below

```
PORT = 5000
MONGO_URI = <url_to_MONGO_DB>
JWT_SECRET = <key_passwords_encryption>
```

SOCKET STATS | DASHBOARD for DISCORD BOT STATS
============================================== 
> Server statistics Dashboard builder for Discord BOT through WebSocket.

This dasboard base on Bootstrap and chart.js. then for the comunication we open a websocket using socket.io

installing this package and complete all requirement, ur project will automaticly greanate websocket server and open new routing following `http://localost:8080/gb-status`. or `<project_url>/gb-status`


> The following example attaches project to a plain Node.JS HTTP server listening on port 8080 .

</ Description soon >

## Requirement
this project require following packages:
+ [express](https://www.npmjs.com/package/express)
+ [socket.io](https://www.npmjs.com/package/socket.io)
+ [os-utils](https://www.npmjs.com/package/os-utils)

## Installation
install the package using:
```
$ npm install socketstats
```

### Basic routing
then use express and create express basic routing.
> The following example attaches project to a plain Node.JS HTTP server listening on port 8080 .
```js
const express = require("express");
const app = express();
const _PORT = process.env.PORT || 8080;

// routing
//.....
//.....
// routing end

// common case listening port given by express
app.listen(_PORT, () => {
    console.log("Listening to port: "+_PORT);
})

```

to make `WebServer` and `WebSocket` **run in singgle server**. You need to pass the `Server` to `socketstats`, and not the express application function. Also make sure to call `.listen` on the `server`, not the `app`.

then for gathering info from the bot we need authorize `client` fom discord. so we do listen to port after te bot is ready.
```js
const express = require("express");
const app = express();
const _PORT = process.env.PORT || 8080;

// routing
//.....
//.....
// routing end

// common case listening port given by express
// app.listen(_PORT, () => {
//     console.log("Listening to port: "+_PORT);
// })

// basic discord,js BOT requirement
const Discord = require("discord.js");
const client = Discord.Client();

// some handler command
// .....
// .....

client.on('ready', () => {
    console.log('Ready..!')

    // socketStats Configuration
    const socketStats = require("socketstats");
    const server = new socketStats(app, client);

    // open / listen port using socketStats
    server.listen(_PORT, () => {
        console.log("Listening to port: "+_PORT);
    });

});

// basic discord.js BOT login method
client.login(Token)


```

## License

[GNU GPLv3](#)

## Keywords





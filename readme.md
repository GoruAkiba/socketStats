SOCKET STATS | DASHBOARD for DISCORD BOT STATS
============================================== 
> Server statistics Dashboard builder for Discord BOT through WebSocket.
<center>

![dashboard](https://cdn.discordapp.com/attachments/664516457542975492/746637803332304966/unknown.png)

</center>
This dashboard is based on Bootstrap and chart.js. For the comunication we open a websocket using socket.io

installing this package will complete all requirements. Your project will automatically create a websocket server and open new routing following `http://localost:8080/gb-status`. or `<project_url>/gb-status`


## Requirement
This project require following packages:
+ [express](https://www.npmjs.com/package/express)
+ [socket.io](https://www.npmjs.com/package/socket.io)
+ [os-utils](https://www.npmjs.com/package/os-utils)

## Installation
install the package using:
```
$ npm install socketstats
```
or
```
$ npm -i socketstats
```

### Basic routing
Then use express and create a basic routing.
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

To make `WebServer` and `WebSocket` **run on a single server**. You need to pass the `Server` to `socketstats`, and not to the express application. So make sure to call `server.listen` instead of `app.listen`.

For gathering info from the bot we need to authorize `client` from Discord. So we call the server in the ready function.
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

[GNU GPLv3](https://github.com/GoruAkiba/socketStats/blob/master/LICENSE)






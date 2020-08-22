const express = require("express");
const app = express();
const _PORT = process.env.PORT || 8080;


// routing
app.get("/", (req, resp) => {
    resp.sendFile(__dirname+"/views/index.html");
});


// app.listen(_PORT, () => {
//     console.log("Listening to port: "+_PORT);
// })

// bot config
const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const Token = process.env.Token;

client.on("ready", ()=>{
    console.log(`${client.user.username} Ready!`);
    
    const socketStatus = require("../lib/socketStatus.js");
    const server = new socketStatus(app, client);

    server.listen(_PORT, () => {
        console.log("Listening to port: "+_PORT);
    });
})

client.login(Token)


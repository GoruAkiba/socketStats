
module.exports = class socketStatus {
/**
 * Socket Status Page init func
 * @param {Function} app express App
 */
    constructor(app,client){
        /**
         * create server and listening to port
         * @param {Intenger} _PORT listening port
         * @param {Function} callback callback function
         */
        if(!app || !client) return {listen: () => new Error("Please Provide require params") };
        this.listen = (_PORT, callback)=>{
            // socket config
            const server = require("http").createServer(app);
            const io = require("socket.io")(server);
            const fs = require("fs");

            io.on("connection", clientSocket => {
                // console.log("new client connected | "+clientSocket.id)
                // console.log(client.user)
                var {username, id, tag, verified} = client.user,
                    data = {
                        username: username,
                        tag: tag,
                        id:id,
                        socket : {
                            id: clientSocket.id
                        },
                        verified:verified,
                        avatar: client.user.displayAvatarURL({
                                format: "png",
                                size:512
                            })
                    }
                clientSocket.emit("cl-connected",data);
            });


            setInterval(stats,1000)


            // stats routing
            var view_path = __dirname+"/views/dashboardStatus.html";
            app.get("/gb-status", (req, resp)=>{
                fs.readFile(view_path,"utf8",(err,data)=>{
                    if (err) console.log(err);
                    resp.send(data);
                })
                // resp.send(require(view_path));
            });

            // stats
            function stats(){  
                const os = require("os"),
                    osu = require("os-utils");
                
                var ping = client.ws.ping; 
                osu.cpuUsage(function(v){
                    var data =  {
                        status:"ok",
                        ping : ping,
                        sysUptime : p_uptime(os.uptime()),
                        uptime: p_uptime(process.uptime()),
                        cpuUsage : Math.round(v*1000)/10+"%",
                        memUsage: Math.floor((os.totalmem() - os.freemem())/os.totalmem()*1000)/10+"%"
                    }
                    io.emit("srv-stats",data);
                });
            }

            // uptime parser
            function p_uptime(n){
                var t_d = 24*60**2,
                    t_h = 60**2,
                    d = (n-n%t_d)/t_d,
                    h = (n%t_d - n%t_h)/t_h,
                    m = (n%t_h - n%60)/60,
                    s = Math.floor(n%60);

                return `${d? d+"d ":""}${(d||h)? h+"h ":""}${(h||m)? m+"m ":""}${(m||s)? s+"s":""}`
            }

            let callback_parram = server.listen(_PORT)
            if(callback) return callback(callback_parram);
        }
    }
    
}

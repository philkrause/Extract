var now = require('performance-now');

//underscore has function helps you with data organizing
var _ = require('underscore');

module.exports = function(){

    var client = this;

    //these objects will be added at runtime...
    //this.socket = {}
    //this.user = {}


    //Initialization
    this.initiate = function(){
        

        //send the connection handshake packet to the client.
        client.socket.write(packet.build(["HELLO", now().toString()]))

        console.log('client initiated');
    
    };

    //client methods
    this.enterroom = function(selected_room){

        maps[selected_room].clients.forEach(function(otherClient){
            otherClient.socket.write(packet.build(["ENTER", client.user.username, client.user.pos_x, client.user.pos_y]))
        })

        maps[selected_room].clients.push(client);

    };
    
      //Broadcast to all clients except youself
  
    this.broadcastroom = function(packetData){
        maps[client.user.current_room].clients.forEach(function(otherClient){
            
            if(otherClient.user.username != client.user.username){
                otherClient.socket.write(packetData);
            
            };
        })
    };



//Socket Stuff
    this.data = function(data){
        packet.parse(client, data);
    };

    this.error = function(err){
        console.log("client error" + err.toString());
    };

    this.end = function(){
        console.log("client closed");
    };


//Socket Stuff
    this.data = function(data){
        packet.parse(client, data);
    };

    this.error = function(err){
        console.log("client error" + err.toString());
    };

    this.end = function(){
        console.log("client closed");
    };

}; 
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req,res){
    res.render('index.ejs')
});

io.sockets.on('connection', function(socket) {
    socket.on('usuario', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' Se ha unido..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' Se ha ido..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});
const server = http.listen(process.env.PORT || 5000, function() {
    console.log('listening');
});
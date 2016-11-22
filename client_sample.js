var net = require('net');

var client = new net.Socket();

var vendor = '';
var device = '';
var uuid  = 'f68d1aee-afda-11e6-80f5-76304dec7eb7'; //your UUID
var auth_token = '';

var owner  = '';
var group  = '';

var remote_ip = '127.0.0.1';
var remote_port = 1234;

client.connect( remote_port , remote_ip, function() {
	console.log('Connected');

    client.setEncoding('utf8');

	client.write(JSON.stringify({
      vendor: vendor,
      device: device,
      uuid:   uuid, //your UUID
      token:  auth_token,
      action: 'update'
    }));

    client.end( JSON.stringify({
      uuid:   uuid, //your UUID
      action: 'close'
    }), 'utf8' );

});

client.on('data', function(data) {
	console.log('Received: ');
	console.log( data );
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

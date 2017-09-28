/**
 * Created by maheryHaja on 8/1/2017.
 */
const http         = require('http'),
    fs           = require('fs'),
    path         = require('path'),
    contentTypes = require('./utils/content-types'),
    sysInfo      = require('./utils/sys-info'),
    env          = process.env;

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/webcup2017';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var express = require("express");

var app = express();
var chalk = require("chalk");
var sock;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var server = require("http").Server(app);
var io = require("socket.io").listen(server);






//---------creation de la connexion vers le serveur
var io = require('socket.io-client');
//var io = require('socket.io-client')("http://127.0.0.1:3000");

var prompt = require('prompt');
var socket = io("http://vani-project-vani-project.193b.starter-ca-central-1.openshiftapps.com",
//var socket = io("http://127.0.0.1:3000",



    {
    transports: ['websocket']
});

socket.on('connect', function(){

    console.log('connected\n>');

});

socket.on("disconnect", function(){
	console.log(chalk.green("Deconnexion du serveur ... :/ "));
});

socket.on("message", function(data){
   console.log(chalk.red.underline("\nVani: ")+data.message.text+"");
});

prompt.message = "";
prompt.delimiter = "";

prompt.start();
attendre();




app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 4000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

server.listen(env.NODE_PORT || 4000, env.NODE_IP || '127.0.0.1', function () {
    console.log(`Application worker ${process.pid} started...`);
});

function attendre(){
    prompt.get({name:"msg", message: chalk.blue(">")}, function(err, result){
        //console.log("Mahery: "+result.msg);
        if(result.msg!="end"){
            envoyer(result.msg);
            attendre();
        }

    });
}

function envoyer(message) {
    socket.emit("reponse", message);
}

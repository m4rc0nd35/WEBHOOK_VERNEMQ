const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const on_client_wakeup = require('./on_client_wakeup');
const on_publish = require('./on_publish');
const on_client_gone = require('./on_client_gone');
const on_test = require('./on_test');

app.use('/static', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    next();
});

app.use("/webhook/on_client_wakeup", on_client_wakeup);
app.use("/webhook/on_publish", on_publish);
app.use("/webhook/on_client_gone", on_client_gone);
app.use("/webhook/on_test", on_test);

app.use((req, res, next) =>{
    const erro = new Error("Pagina não encontrada");
    erro.status = 404;
    next(erro);
});
app.use((error, req, res, next) =>{
    return res.status(error.status || 500).send({erro: {mensagem: error.message}});
});

module.exports = app;
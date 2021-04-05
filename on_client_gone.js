const express = require("express");
const router = express.Router();
const mysql = require('./mysql');

module.exports = router.post('/', async (req, res, next)=>{
	console.log('on_client_gone', req.body);
	await mysql.execute('CALL SP_DEVICE_MQTT(?, ?);', [
		req.body.client_id,
		0
	]).catch(console.log);
	return res.status(200).send({"result": "ok"});
});
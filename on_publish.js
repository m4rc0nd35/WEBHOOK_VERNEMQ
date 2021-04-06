const express = require("express");
const router = express.Router();
const mysql = require('./mysql');

module.exports = router.post('/', async (req, res, next)=>{
	console.log('on_publish', req.body);
	let json =  req.body;
	let data = Buffer.from(json.payload, 'base64').toString('ascii').split('|');
	
	let assoclist;
	if(data.length > 2)
		assoclist = data[3];
	else
		assoclist = null;
	
	await mysql.execute('CALL SP_TELEMETRY(?, ?, ?, ?, ?, ?);', [
		json.client_id,
		json.username,
		data[0],
		data[1],
		data[2],
		assoclist
	]).catch(console.log);
	return res.status(200).send({"result": "ok"});
});
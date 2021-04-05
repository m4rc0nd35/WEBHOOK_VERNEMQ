const express = require("express");
const router = express.Router();
const distinct = '';

module.exports = router.post('/', (req, res, next)=>{
	console.log('on_publish', req.body);
	if(distinct !== req.body.payload){
		console.log(Buffer.from(req.body.payload, 'base64').toString('ascii'))
		distinct = req.body.payload
	}
	return res.status(200).send({"result": "ok"});
});
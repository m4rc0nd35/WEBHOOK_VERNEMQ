const express = require("express");
const router = express.Router();
const mysql = require('./mysql');

module.exports = router.post('/', async (req, res, next)=>{
	console.log('on_test', req.body);

	return res.status(200).send({"result": "ok"});
});
// const express = require('express');
// const router = express.Router();
// const aiController = require("../controller/ai.controller")

// router.get("/get-response",aiController.getResponse)

// module.exports = router;


import express from 'express';
import  {getReview}  from '../controller/ai.controller.js';



const router = express.Router();

router.post("/get-review", getReview);



export default router;

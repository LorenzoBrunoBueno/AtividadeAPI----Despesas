const express = require('express');

const router = express.Router();
const UserView = require('../views/user');

console.log("Auth Routes Carregado");

router.post('/users', UserView.create);
router.post('/auth/login', UserView.login);

module.exports = router;

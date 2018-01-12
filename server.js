const http = require('http');

const express = require('express');

const port = process.env.PORT || 5000;
const app = require('./app');


app.listen(port, () => console.log(`Listening on port ${port}`));
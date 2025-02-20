const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AdminRouter = require('./Routes/AdminRoutes')
app.use('/api/v1', AdminRouter);

module.exports=app;

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const AdminRouter = require('./Routes/AdminRoutes')
const GreetingRouter = require('./Routes/GreetingRoutes')



app.use('/api/v1', AdminRouter);
app.use('/api/v1', GreetingRouter);

module.exports=app;

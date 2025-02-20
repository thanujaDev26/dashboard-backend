const app = require('./index')
const mongoose = require('mongoose')
require('dotenv').config();
const port = process.env.PORT || 3001;
const uri = process.env.URI;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, '0.0.0.0', () => {
        console.log('Listening on port', port);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
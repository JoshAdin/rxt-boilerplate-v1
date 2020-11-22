const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// if we are on heroku and this variable - PORT exist use it
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// if what the user requested is not in the public folder just display the index.html,
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});

app.listen(port, () => {
    console.log('Server is up');
});

const express = require('express');
const app = express();


app.get('/', (req,res) => {
    res.send('hello world');
})

app.listen(porcess.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`);
})

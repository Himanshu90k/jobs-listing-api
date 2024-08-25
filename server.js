import express from 'express';
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.json({msg: "server running"});
});

app.listen(port, console.log(`The server is running on port ${port}`));
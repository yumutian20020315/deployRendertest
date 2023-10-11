const express = require('express');
const path = require('path')
const fs = require('fs').promises
const app = express();
const port = 3000;

app.get('/', (req, res) => {

    res.redirect("/site/");
});

app.use("/site/", (req, res) => {
    const options = {
        root: path.join(__dirname, 'wwwroot')
    }
    
    let pathFile;
    if (req.url == '/') {
        pathFile = path.join(__dirname, 'wwwroot', 'index.html')
    } else {
        pathFile = path.join(__dirname, 'wwwroot', req.url)
    }


    res.sendFile(req.url, options)
}) 

app.get('/api/animals', async (req,res) => {
    const animalQuery = req.query.animal
    const imgDir = path.join(__dirname, "wwwroot/imgs")

    const imgs = await fs.readdir(imgDir)
    const result = imgs.filter((fileName) => fileName.includes(animalQuery))

    const results = result.join('\n');
    // console.log(results)

    res.send(results);
})




app.listen(port, 'localhost', () => {
    console.log(`Listening on http://localhost:${port}`);
});
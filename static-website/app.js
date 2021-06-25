const express = require('express')
require('dotenv').config();
const path = require('path')
const fs = require('fs');
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, './static/')))


const staticHandler = function(req, res) {
  

  const filePath = path.join(__dirname, 'index.html');
  console.log(filePath);
  // fs.rename(newFilePath, filePath)

  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    
    data = data.replace(/\$SRC/g, process.env.WEBLOADER_URL);
    data = data.replace(/\$ENV/g, process.env.ENVIRONMENT_ID);
    data = data.replace(/\$END/g, process.env.PARTICIPANT_URL);
    
    
    
    res.send(data);
  });
}

app.get('/', staticHandler);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
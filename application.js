const express = require('express');
const path = require('path'); 

const application = express();


// Set templates folder
application.use(express.static(path.join(__dirname, '/templates'))); 

const PORT = process.env.PORT || 5000; 

application.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`)); 

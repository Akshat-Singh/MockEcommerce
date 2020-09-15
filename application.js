const express = require('express');

const application = express();

application.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>"); 
}); 

const PORT = process.env.PORT || 5000; 

application.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`)); 

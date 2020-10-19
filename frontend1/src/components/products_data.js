import React, { Component } from 'react';
import axios from 'axios';

let data;
axios.get('http://localhost:5000/shop/products')
    .then(res => {
        data = JSON.parse(JSON.stringify(res.data));
        for (var key in res.data){
            data = data + res.data[key]['itemName'] + '\n';
        } 
    })
    .catch(err => console.log(err)); 



export default data
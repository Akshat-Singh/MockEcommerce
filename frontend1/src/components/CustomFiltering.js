import React from 'react'
import "./CustomFiltering.css";
import {Link} from "react-router-dom";
import axios from 'axios'; 


export default class CustomFilter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            main_suggestions: [],
            links: [], 
            suggestions: [],
            text: ''
        }
    }

    /*componentWillMount() {
        axios.get('http://localhost:5000/shop/products')
            .then(res => {
                let _suggestions = [];
                let _links = [];  
                for (var key in res.data) {
                    _suggestions.push(res.data[key]['itemName']); 
                    _links.push(res.data[key]['_id']); 
                }
                this.setState({main_suggestions: _suggestions, links: _links});  
            } 
        )
        .catch(err => console.log(err)); 
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.main_suggestions.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index}><a href={"http://localhost:3000/products/" + this.state.links[index]}>{item}</a></li>))
                }
            </ul>
        );
    } */

    render() {
        return(
            
        )    
    }
}

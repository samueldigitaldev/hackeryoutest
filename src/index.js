import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import AllBeverages from './components/all_beverages';
import FeaturedBeverage from './components/featured_beverage';
import Normalize from '../src/style/normalize.css';
import Style from '../src/style/style.css';

let beverageArray = [];
let totalBeverageList = [];
let product_id;
const API_KEY = 'MDo0MzJkZjJlYS1kZmI2LTExZTctODU1NS0zYmE3NWFkYWYzNGY6U0lESW9qUXNFd3J1b2pBSUJOWmh3eFhFQk9BR3dpWGdNcHJ1';
const ROOT_URL = `https://lcboapi.com/products?where=is_seasonal&per_page=100&page=1&q="beer+beau"&access_key=${API_KEY}`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beverages: [],
            selectedBeverage: {},
            product_id: "",
            stores: []
        };
        
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentDidMount() {
        axios.get(ROOT_URL)
        .then(response => {
            response.data.result.map((totalList) => {
            totalBeverageList.push(totalList);    
        })    
            this.setState({
                beverages: totalBeverageList
            });
            response.data.result.map((list) => {
                if(list.tags.includes("beaus") === true){
                    beverageArray.push(list);
                    this.setState({selectedBeverage:beverageArray[0]});
                    this.setState({product_id:beverageArray[0].id})
                }
            });
        })
        axios.get(`https://lcboapi.com/stores?&per_page=5&page=1&where_not=is_dead&geo=toronto&product_id=${this.state.product_id}&access_key=${API_KEY}`)
        .then(response => {
            this.setState({stores:response.data.result})
        })
    };

    product_id(productId) {
        axios.get(`https://lcboapi.com/stores?&per_page=5&page=1&where_not=is_dead&geo=toronto&product_id=${productId}&access_key=${API_KEY}`)
        .then(response => {
            product_id = response;
        })
    }

    componentWillMount() {
        if (product_id === undefined){
            return true;
        }
        else{
            this.setState({stores:product_id.data.result})
        }
    }
    
    render() {
        return (
            <div>
                <FeaturedBeverage 
                    beverages={this.state.selectedBeverage} 
                    stores={this.state.stores}
                    productItemId={this.product_id}
                
                />
                <AllBeverages 
                    onBeverageSelect={(selectedBeverage) => this.setState({selectedBeverage})}
                    beverages={this.state.beverages} 
                    componentWillMount={this.componentWillMount}
                />
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

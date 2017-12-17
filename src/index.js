import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import AllBeverages from './components/all_beverages';
import FeaturedBeverage from './components/featured_beverage';
import Normalize from '../src/style/normalize.css';
import Style from '../src/style/style.css';

let beverageArray = [];
let totalBeverageList = [];
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
    }

    componentWillMount() {
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

        }).then(axios.get(`https://lcboapi.com/stores?&per_page=5&page=1&where_not=is_dead&geo=toronto&${this.state.product_id}&access_key=${API_KEY}`)
        .then(response => {
            console.log(response.data.result);
            this.setState({stores:response.data.result})
            console.log(this.state.stores);
            
            })
        )
    };

    render() {
        return (
            <div>
                <FeaturedBeverage 
                    beverages={this.state.selectedBeverage} 
                    stores={this.state.stores}

                
                />
                <AllBeverages 
                    onBeverageSelect={(selectedBeverage) => this.setState({selectedBeverage})}
                    beverages={this.state.beverages} 
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
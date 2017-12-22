import React from 'react';

const FeaturedBeverage = (props) => {

    let selectedBeverage = props.beverages;
    //let selectedBeverageDescription = selectedBeverage.description;
    let beverageImage = selectedBeverage.image_url;        

    // if(selectedBeverageDescription === null) {
    //     selectedBeverageDescription = "This Beverage is Getting No Description From the API";
    // }
    
    // if (beverageImage === null) {
    //     beverageImage = 'https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg';
    // }

    function centsToDollars(cents) {
        return cents/100;
    }
    
    if (selectedBeverage === undefined){
        return null;
    }

    console.log(props);
            
    return(
        <div className="featured-beverage" id="featured-beverage">
            <div className="featured-beverage-image">
                <img src={beverageImage} alt={selectedBeverage.name} height="100%" width="55%" /> 
            </div>
            <div className ="featured-beverage-info">
                <div className="featured-beverage-name">{selectedBeverage.name}</div>
                <div className="featured-beverage-package">{selectedBeverage.package}</div>
                <div className="featured-beverage-price">Price: ${centsToDollars(selectedBeverage.price_in_cents)}</div>
                <div className="featured-beverage-origin">Beverage Origin: {selectedBeverage.origin} </div>
                <div className="featured-beverage-producer">Producer: {selectedBeverage.producer_name} </div>
                <div className="featured-beverage-tags">Tags: {selectedBeverage.tags}</div>
            </div>
        </div>
    );

}

export default FeaturedBeverage;
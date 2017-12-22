import React from 'react';

const AllBeverages = (props) => {
 
    let beverageList = props.beverages;

    const beverageListItem = beverageList.map((beverage, index) => {
        let beverageTag = beverage.tags;
        let beverageImage = beverage.image_thumb_url;
        if(beverageTag.includes("beaus") === false || beverageTag.includes("beer") === false){
            return null;    
        }
        if (beverageImage === null) {
            //beverageImage = 'https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg';
            return null;
         }           
        if(beverage.name==="Lug Thread"){
            return null;
        }else{

            return (
                <div onClick={(event) => { 
                    props.onBeverageSelect(beverage); 
                }
            }                   
                key={index} 
                className="beverage-item">
                    <a href="#featured-beverage"><img src={beverageImage} alt={beverage.name} height="80%" width="80%" />
                    <div>{beverage.name}</div></a>
                </div>
            )
        }
    });

    return(
        <div className="beverage-list">
            {beverageListItem}
        </div>
    );
}

export default AllBeverages;
import React from 'react';

const ShowProduct = ({product,handleCartAdd}) => {
    return (
        <div className='cart'>
            <img style={{height:'200px',width:'100%',borderRadius:'15px'}} src={product.img} alt="" />
            <h3> price {product.price}$</h3>
            <h3>{product.name}</h3>
            <button onClick={()=>handleCartAdd(product)}>Add To Cart</button>
        </div>
    );
}

export default ShowProduct;
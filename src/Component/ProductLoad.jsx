import React, { useEffect, useState } from 'react';
import './style.css'
import ShowProduct from './ShowProduct';
import { addCartLS, getStoreData, removeCartItem } from '../Utilitis/Store';
const ProductLoad = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{ 
            const response=await fetch('product.json')
            const productData=await response.json()
            setProducts(productData)
        }
        fetchData()
    },[])

    const [cart,setCart]=useState([])

    useEffect(()=>{
        if (products.length>0) {
            const getCart=getStoreData()
            console.log(getCart);
            const saveCart=[]
            for(const id of getCart){
                const dbCart=products.find(product=>product.id===id)
                if (dbCart) {
                    saveCart.push(dbCart)
                }
                
            }

            setCart(saveCart)
            
        }


    },[products])

    const handleCartAdd=(carts)=>{
        console.log(carts);
        const newCart=[...cart,carts]
        setCart(newCart)
        addCartLS(carts.id)

    }
    const removehandelar=(id)=>{
        const reamingCart=cart.filter(cart=>cart.id!==id)
        setCart(reamingCart)
        removeCartItem(id)
    }

    const [showCartTable,setShowCartTable]=useState(false)
    return (
        <div>
            <div className="cart-conteinar" style={{display:'flex',justifyContent:'space-between',justifyItems:'center'}}>
                <h2> Bottle Zone  {products.length} Items Product Available</h2>
                <h2><button onClick={()=>setShowCartTable(!showCartTable)} >Total Add Cart {cart.length} </button></h2>
            </div>

            <div className="">
            {
                showCartTable && <table class="product-table">
                <thead>
                    {
                        cart.length>0 && <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Status</th>
                       </tr>
                       
                    }
                    {cart.length<1 && <h1 style={{textAlign:'center'}}>Not Available cart !!! </h1>}
                </thead>
                <tbody>
                    {
                        cart.map(cart=><tr>
                            <td><img style={{height:'50px'}} src={cart.img} alt="" /></td>
                            <td>{cart.name}</td>
                            <td>${cart.price}</td>
                            <td><button type="button" style={{backgroundColor:'red'}} onClick={()=>removehandelar(cart.id)} > Delate </button></td>
                        </tr>)
                    }
                    
                    
                </tbody>
            </table>
            }
            </div>


           <div className="conteinar">
                {
                products.map(product=><ShowProduct key={product.id} product={product} handleCartAdd={handleCartAdd} ></ShowProduct>)
                }
           </div>
        </div>
    );
};

export default ProductLoad;
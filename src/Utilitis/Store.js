const getStoreData=()=>{
    const getData=localStorage.getItem('cart')
    if (getData) {
        return JSON.parse(getData)
    }
    return [];

}

const addCartLS=(id)=>{
    const cart=getStoreData();
    cart.push(id)
    saveCart(cart)
}

const saveCart=(cart)=>{
    const stringData=JSON.stringify(cart)
    localStorage.setItem('cart',stringData)
}

const removeCartItem=(id)=>{
    const cart=getStoreData()
    const reaming=cart.filter(idx=>idx!==id)
    saveCart(reaming)
}

export {getStoreData,addCartLS,removeCartItem}
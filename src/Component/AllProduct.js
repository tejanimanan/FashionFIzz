import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'

export default function AllProduct() {
    const [product, SetProduct] = useState()
    const navigation = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5001/products').then((res) => res.json()).then((data) => SetProduct(data))
    }, [])

    
    const AddToCart = async (v) => {
        const userId = localStorage.getItem('userId');
      
        if (!userId) {
          alert('User is not logged in. UserId not found in localStorage.');
          navigation('/login');
          return;
        }
      
        try {
          // Step 1: Fetch user's cart to check if the product already exists
          const response = await fetch(`http://localhost:5001/cart?userId=${userId}`);
          const cartItems = await response.json();
      
          // Step 2: Check if the product is already in the cart
          const productExists = cartItems.some(item => item.productId === product.id);
      
          if (productExists) {
            alert('This product is already in your cart.');
            return;
          }
      
          // Step 3: If not in cart, add the product
          const cartItem = {
            productId: v.id,
            userId: userId,
            price: v.price,
            quantity: 1,
            name: v.name,
            size: v.size,
            color: v.color,
            image: v.image,
          };
      
          const addResponse = await fetch('http://localhost:5001/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItem),
          });
      
          if (addResponse.ok) {
            alert('Product is added to cart');
            navigation('/cart');
          } else {
            alert('Failed to add product to cart. Please try again.');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          alert('Something went wrong. Please try again.');
        }
      };


    return (
        <div className=''>
            <div className='container'>
                <div className='row'>
                    {
                        product && product.map((v) => (
                            <div key={v.id} className='col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-4  p-3'>
                                <div className="card shadow-lg   ">
                                    <img src={v.image} height="350px" className="card-img-top p-3 product-img" alt="..." />
                                    <div className="card-body product-text text-start d-flex justify-content-between">
                                        <div className='card-text'>
                                            <p className="card-text fw-semibold">{v.name}</p>
                                            <p className="card-text fw-bold">Rs.{v.price}</p>
                                        </div>
                                        <div className='text-end'>
                                            <button className='btn'><Link to={`/singleproduct/${v.id}`} className='btn-bg p-2 text-white text-decoration-none rounded-2 px-2  mt-2'>Quick View</Link></button>
                                            <button style={{background:"#0F2143"}} onClick={() => AddToCart(v)} className='btn text-white ms-3 mt-2'>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}

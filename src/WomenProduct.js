import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function WomenProduct() {
    const [product, setProduct] = useState([]);
    const [fdata, setFdata] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        // Fetch products data
        fetch('http://localhost:5001/products')
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                // Filter products that belong to 'Women' category after fetching
                const filtered = data.filter((product) =>
                    product.category.toLowerCase().includes("women")
                );
                setFdata(filtered);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []); // Empty dependency array ensures this runs only once when component mounts

    const AddToCart = (product) => {
        fetch('http://localhost:5001/cart', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        }).then((res) => {
            if (res.ok) {
                alert("Product added to cart");
                navigation('/cart');
            } else {
                alert("Failed to add to cart");
            }
        }).catch((error) => {
            console.error("Error adding to cart:", error);
            alert("Error adding to cart");
        });
    };

    return (
        <div className='container'>
            
            <div className='row'>
                {
                    fdata && fdata.map((v) => (
                        <div key={v.id} className='col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-4'>
                            <div className="card shadow-lg">
                                <img src={v.image} height="350px" className="card-img-top p-3" alt={v.name} />
                                <div className="card-body text-start product-text d-flex justify-content-between">
                                    <div className='card-text'>
                                        <p className="card-text fw-semibold">{v.name}</p>
                                        <p className="card-text fw-bold">Rs.{v.price}</p>
                                    </div>
                                    <div className='text-end '>
                                       <button className='btn '><Link to={`/singleproduct/${v.id}`} className='btn-bg p-2 text-white text-decoration-none rounded-2 px-2  mt-2'>Quick View</Link></button>
                                        <button style={{background:"#0F2143"}} onClick={() => AddToCart(v)}  className='btn text-white ms-3 btn-bg mt-2'>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

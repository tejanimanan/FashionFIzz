import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';

export default function Cart() {
    const [product, SetProduct] = useState([]);
    const [cartQuantities, SetCartQuantities] = useState({});
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    // Load cart items for the user when component is mounted
    useEffect(() => {
        if (userId) {
            fetch('http://localhost:5001/cart')
                .then((res) => res.json())
                .then((data) => {
                    // Filter cart items for the logged-in user
                    const userCartItems = data.filter((cartItem) => cartItem.userId === userId);
                    SetProduct(userCartItems);

                    // Initialize quantities based on the fetched cart data
                    const initialQuantities = {};
                    userCartItems.forEach(item => {
                        initialQuantities[item.id] = item.quantity || 1;  // Default quantity to 1 if not set
                    });
                    SetCartQuantities(initialQuantities);
                });
        } else {
            alert("Please log in first");
            navigate('/');
        }
    }, [userId, navigate]);

    // Handle increment and decrement of product quantity
    const handleQuantityChange = (id, increment) => {
        const newQuantities = { ...cartQuantities };
        newQuantities[id] = newQuantities[id] + (increment ? 1 : -1);

        if (newQuantities[id] < 1) {
            newQuantities[id] = 1;  // Ensure quantity is never less than 1
        }

        SetCartQuantities(newQuantities);

        // Optionally update the cart data on the server if needed
        fetch('http://localhost:5001/cart/' + id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...product.find(p => p.id === id), quantity: newQuantities[id] }),
        });
    };

    // Calculate the total price of the cart
    const calculateTotal = () => {
        return product.reduce((total, item) => {
            const itemTotal = item.price * (cartQuantities[item.id] || 1);
            return total + itemTotal;
        }, 0).toFixed(2);
    };
    const Ondelete = (id) => {
        SetProduct(product.filter((v) => v.id !== id))
        fetch('http://localhost:5001/cart/' + id, {
            method: 'DELETE',
        }).then((res) => {
            if (res) {
                toast.error('🦄 Product id delete from cart!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            }
        })

    }
    return (
        <div className=''>
            <NavBar />
            <div className='bg-img '>
                <ToastContainer />
                {/* <div><Link to={'/shop'} className='btn btn-dark shadow text-start '>Go Back</Link></div> */}
                <div className="container py-5 ">
                    {
                        product.length > 0 ? (<> <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <table className="table table-striped table-bordered border-dark table-hover align-middle text-start">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Remove</th>
                                            <th className="ps-4">Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    {
                                        product && product.map((v) => (
                                            <tbody key={v.id}>
                                                <tr>
                                                    <td><button onClick={() => Ondelete(v.id)} className='btn btn-danger'>X</button></td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img src={v.image} className="img-fluid rounded" style={{ width: "50px" }} />
                                                            <span className="ms-3">{v.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>Rs.{v.price}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <button
                                                                onClick={() => handleQuantityChange(v.id, false)}
                                                                className="btn btn-sm btn-info"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="mx-2">{cartQuantities[v.id]}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(v.id, true)}
                                                                className="btn btn-sm btn-info"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>Rs.{(v.price * (cartQuantities[v.id] || 1)).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                            
                                        ))}
                                </table>
                                <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>

                            </div>
                            <div className="col-lg-4">
                                <div className='card'>
                                    <div className='card-header bg-img'>
                                        <h4 className='text-start fw-bolder text-white'>Cart Detail</h4>
                                    </div>
                                    <div className='card-body'>
                                        <div className='d-flex justify-content-between'>
                                            <b>Price (item{product.length})</b>
                                            <b>{calculateTotal()}</b>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <b>Discount(10%)</b>
                                            <b>{calculateTotal() - 10}</b>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <b>Delivery Charges</b>
                                            <b><del>Rs80</del> <span className='text-success'>Free</span></b>
                                        </div>
                                        <hr></hr>
                                        <div className='d-flex justify-content-between'>
                                            <b>Total Amount</b>
                                            <b>{calculateTotal()}</b>
                                        </div>
                                    </div>
                                    <button className='ms-auto btn bg-info my-2 mx-2 fw-bold  w-50'> Place Order</button>

                                </div>
                            </div>
                        </div></>) : (<>
                            <div className="d-flex justify-content-center align-items-center vh-100 bg-img">
                                <div className="text-center p-4 border-0 card shadow-sm">
                                    {/* Empty Cart Image */}
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                        alt="Empty Cart"
                                        className="img-fluid"
                                        style={{ maxWidth: "250px" }}
                                    />
                                    <h2 className="mt-3">Your Cart is Empty</h2>
                                    <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
                                    <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

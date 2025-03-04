import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from 'react';

// Lazy-loaded components
const About = lazy(() => import('./Component/About'));
const Contact = lazy(() => import('./Component/Contact'));
const Home = lazy(() => import('./Component/Home'));
const Shop = lazy(() => import('./Component/Shop'));
// const Home = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./Component/Home")), 2000)));
// const Shop = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("./Component/Shop")), 1000)));
const Register = lazy(() => import('./Component/Register'));
const Login = lazy(() => import('./Component/Login'));
const AllProduct = lazy(() => import('./Component/AllProduct'));
const WomenProduct = lazy(() => import('./WomenProduct'));
const MenProduct = lazy(() => import('./MenProduct'));
const BagProduct = lazy(() => import('./Component/BagProduct'));
const Cart = lazy(() => import('./Component/Cart'));
const SingleProduct = lazy(() => import('./Component/SingleProduct'));

// Loader Component
// const Loader = () => (
//   <div className="d-flex flex-column justify-content-center align-items-center vh-100">
//     <div className="d-flex gap-3">
//       <div className="spinner-border  slow-spinner" style={{ width: "8rem", height: "8rem" }} role="status">
//         <div className="spinner-border  slow-spinner1" style={{ width: "8rem", height: "8rem" }} role="status">
//           <div className="spinner-border  slow-spinner" style={{ width: "8em", height: "8rem" }} role="status">
//           <div className="spinner-border  slow-spinner1" style={{ width: "8em", height: "8rem" }} role="status">
//           <div className="spinner-border  slow-spinner" style={{ width: "8em", height: "8rem" }} role="status">
//           <div className="spinner-border  slow-spinner1" style={{ width: "8em", height: "8rem" }} role="status">
            
//             </div>
//             </div>
//             </div>
//           </div>

//         </div>

//       </div>

//     </div>
//     <div className="mt-3 fw-bold fs-4 text-dark">Loading, please wait...</div>
//   </div>
// );
const Loader = () => (
  <div className="loader-container">
    <div className="bubbles">
      <span style={{ "--i": 1 }}></span>
      <span style={{ "--i": 2 }}></span>
      <span style={{ "--i": 3 }}></span>
      <span style={{ "--i": 4 }}></span>
      <span style={{ "--i": 5 }}></span>
      <span style={{ "--i": 6 }}></span>
      <span style={{ "--i": 7 }}></span>
      <span style={{ "--i": 8 }}></span>
      <span style={{ "--i": 9 }}></span>
      <span style={{ "--i": 10 }}></span>
    </div>
    <h2 className="loading-text">Loading, please wait...</h2>
  </div>
);

// Component that will wrap the entire app with `BrowserRouter`
const AppWithRouter = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate(); // This hook tracks route changes

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, [navigation]);

  return (
    <div className="App">
      {/* Show loader if loading state is true */}
      {loading && <Loader />}

      <div className='' style={{ display: (loading) ? "none" : "block" }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />

            <Route path='/shop' element={<Shop />}>
              <Route index element={<AllProduct />} />
              <Route path='women' element={<WomenProduct />} />
              <Route path='men' element={<MenProduct />} />
              <Route path='bag' element={<BagProduct />} />
              <Route path='shoes' element={<h2>Shoe Product page</h2>} />
            </Route>

            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/singleproduct/:id' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
}

export default App;

import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Book from "./components/Book"
import ContactUs from "./components/contact us/ContactUs"
import Login from './components/Login';
import DoctorProfilePage from './components/DoctorProfile/DoctorProfilePage';
// import './App.css';
import Admin from './components/Admin';
import Chat from './components/chat';
import Doctorlist from './components/Doctorlist';
import Doctorcards from './components/Doctorcards';
import BlogList from './components/blogList/BlogList';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import PostBlog from './components/DoctorProfile/PostBlog';
import Reviews from './components/Reviews';
import PostBlog from './components/DoctorProfile/PostBlog';
import Oneblog from './components/blogList/blog'
import PatientProfile from './components/PatientProfile';
import Doctor from './components/doctor';
import PharmacyPage from './components/Pharmacy/PharmacyPage';
import ProductCart from './components/Pharmacy/ProductCart';
import ProductList from './components/Pharmacy/ProductList';
import DoctorRates from './components/doctorRates';
import MenuDoctor from './components/menuDoctor/MenuDoctor';
import PaymentFail from './components/PaymentFail';
import PaymentSuccess from './components/PaymentSuccess'; 
import Paymentcomponent from './components/Paymentcomponent';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "J03WrsElQD-7aiYxujDNO",
      domain: "www.chatbase.co"
    };

    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className="App">

        <Routes>

        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Book />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/doctor"  element={<DoctorProfilePage />} />
        <Route path="/bloglist" element={<BlogList />} />
        <Route path="/menuDoctor/postblog" element={<PostBlog />} />
        <Route path='bloglist/:blogId' element={<Oneblog/>} />
        <Route path="/patient" element={<PatientProfile />} />
        <Route path="/doctorlist" element={<Doctor />} />
        <Route path="/Pharmacy" element={<PharmacyPage />} />
        <Route path="/productcart" element={<ProductCart />} />
        <Route path="/Pharmacy/:category" element={<ProductList />} />
        <Route path="/doctorRates" element={<DoctorRates />} />
        <Route path="/menuDoctor" element={<MenuDoctor />} />
        <Route path="/menuDoctor/app" element={<MenuDoctor />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentcomponent/:amount" element={<Paymentcomponent />} />



        </Routes>
    </div>
  );
}

export default App;
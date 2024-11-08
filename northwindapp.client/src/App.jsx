import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chategories from './pages/Chategories'
import Products from './pages/Products'
import {Route, Routes} from "react-router-dom"
function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chategories" element={<Chategories />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
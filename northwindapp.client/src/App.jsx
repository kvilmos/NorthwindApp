import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import {Route, Routes} from "react-router-dom"
function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
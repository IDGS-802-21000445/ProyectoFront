
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SearchResults from './Components/SearchResults';
import ProductDetail from './Components/ProductDetail';
import Sales from './Components/Sales';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<SearchResults />} />
      <Route path="/item/:id" element={<ProductDetail />} />
      <Route path="/sales" element={<Sales />} />
    </Routes>
  </Router>
);

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserHomeComponent from './components/UserHomeComponent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ServiceDetailsComponent from './components/ServiceDetailsComponent';

function App() {
  return(
    <Router>
        <Routes>
            <Route path="/user-home/:userId" element={<UserHomeComponent />} />
            <Route path="/internet-service/:serviceId" element={<ServiceDetailsComponent type="internet" />} />
            <Route path="/tv-service/:serviceId" element={<ServiceDetailsComponent type="tv" />} />
        </Routes>
    </Router>
  )
}

export default App;

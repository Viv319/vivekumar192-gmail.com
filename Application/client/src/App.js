import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import TicketPostPage from './pages/TicketPostPage/TicketPostPage';
import SettingPage from './pages/Setting/SettingPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import TicketDisplay from './components/TicketDisplay/TicketDisplay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/' element={<LoginPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/TicketPost' element={<TicketPostPage/>} />
        <Route path='/home/setting' element={<SettingPage/>} />
        <Route path='/home/analytics' element={<AnalyticsPage/>} />
        
        <Route path='/ticketDisplay/:id' element={<TicketDisplay/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

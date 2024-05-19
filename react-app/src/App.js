import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Route, Routes } from 'react-router-dom'
import Account from './components/Account/Account';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddItems from './components/AddItems/AddItems';
import Profile from './components/Profile/Profile';
import MyItems from './components/MyItems/MyItems';
import ItemDetail from './components/ItemDetail/ItemDetail';
import EditItem from './components/EditItem/EditItem';



function App() {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
          <Route path='/add-items' element={<AddItems />} />
          <Route path='/my-items' element={<MyItems />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/item/:itemId' element={<ItemDetail />} />
          <Route path='/edit-item/:itemId' element={<EditItem />} />
        </Routes>
      </div>
    </>
  );
}

export default App;


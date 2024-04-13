import './Navigation.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../store/session';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CartButton from './CartButton';
import { FaHome } from "react-icons/fa";

const Navigation = () => {
  const user = useSelector((state) => state.session.user);
	const navigate = useNavigate();
  const dispatch = useDispatch()
  const [ showMenu, setShowMenu ] = useState(false)

  const openSideBar = () => setShowMenu(!showMenu)

  const logOutUser = async () => {
    await dispatch(logout())
    return navigate('/')
  }

  console.log(showMenu)

  return (
    <div className="NavContainer">
      <div className='LogoAndName'>
        <FaHome className='Logo'/>
        <div className="StoreName" onClick={() => navigate('/products')}>The Phone Hub</div>
      </div>
      <ul className='links'>
        <li><a href='/products'>Products</a></li>
        <li><a href='/aboutus'>About us</a></li>
        <li><a href='/storepolicy'>Store Policy</a></li>
        <li><a href='/contactus'>Contact Us</a></li>
        <li><i onClick={() => window.alert('Feature Coming Soon!') } className="fa-brands fa-whatsapp"></i></li>
      </ul>
      {user ?
        <>
          <div className='CartAndSideBar'>
            <div className='CartButton'>
              <CartButton/>
            </div>
            <div>
              {showMenu === false ?
              <i onClick={openSideBar} className="fa-solid fa-bars"></i>
              : <i onClick={openSideBar} className="fa-solid fa-x"></i> }
            </div>
            <div className={`${showMenu !== false ? 'Open': 'Close'}`}>
                <div className='WelcomeMsg'>Welcome {user?.first_name}!</div>
                <li><a href="/orders"></a>My Orders</li>
                <li><a href='/storepolicy'>Store Policy</a></li>
                <li><a href='/contactus'>Contact Us</a></li>
                <button onClick={logOutUser} className='LogOutButton'>Log Out</button>
            </div>
          </div>
        </>
      :
        <div className='LoginButton'>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginModal />}
          />
        </div>
      }
    </div>
  );
};

export default Navigation;

import './Navigation.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CartButton from './CartButton';
import SideBar from './SideBar';
import { FaHome } from "react-icons/fa";

const Navigation = ({isLoaded}) => {
  const user = useSelector((state) => state.session.user);
	const navigate = useNavigate();

  return (
    <div className="NavContainer">
      <div className='LogoAndName'>
        <FaHome className='Logo'/>
        <div className="StoreName">The Phone Hub</div>
      </div>
      <ul className='links'>
        <li><a href='/products'>Products</a></li>
        <li><a href='/aboutus'>About us</a></li>
        <li><a href='/storepolicy'>Store Policy</a></li>
        <li><a href='/contactus'>Contact Us</a></li>
      </ul>
      {user ?
        <>
          <div className='CartAndSideBar'>
            <div className='CartButton'>
              <CartButton/>
            </div>
            <div>
              <SideBar user={user}/>
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

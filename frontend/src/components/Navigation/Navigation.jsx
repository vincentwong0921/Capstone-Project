import './Navigation.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const Navigation = ({isLoaded}) => {
  const user = useSelector((state) => state.session.user);
	const navigate = useNavigate();

  return (
    <div className="NavContainer">
      <div className="StoreName">The Phone Hub</div>
      <ul className='links'>
        <li><a href='/products'>Products</a></li>
        <li><a href='/aboutus'>About us</a></li>
        <li><a href='/storepolicy'>Store Policy</a></li>
        <li><a href='/contactus'>Contact Us</a></li>
      </ul>
      <div className='LoginButton'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginModal />}
        />
      </div>
    </div>
  );
};

export default Navigation;

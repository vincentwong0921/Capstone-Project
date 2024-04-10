import './Navigation.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CgSmartphoneChip } from "react-icons/cg";

const Navigation = ({isLoaded}) => {
  const user = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const toLogin = () => navigate("/login");
  const toHome = () => navigate("/")



  return (
    <div className="NavContainer">
      <CgSmartphoneChip className='Icon'/>
      <p className='StoreName' onClick={toHome}>The Phone Hub</p>
      <button className="LoginButton" onClick={toLogin}><i className="fa-solid fa-user"></i> Log In</button>
    </div>
  );
};

export default Navigation;

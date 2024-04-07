import './Navigation.css'
import { useSelector } from "react-redux";
import { PiPhoneDuotone } from "react-icons/pi";


const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="NavContainer">
        <div className='Left'>
            <PiPhoneDuotone className='PhoneIcon'/>
            <p className='StoreName'>The Phone Hub</p>
        </div>
    </div>
  );
};

export default Navigation;

import './Navigation.css'
// import { useSelector } from "react-redux";
import { PiPhoneDuotone } from "react-icons/pi";


const Navigation = () => {
  // const user = useSelector((state) => state.session.user);
  // need to add back isLoaded up there

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

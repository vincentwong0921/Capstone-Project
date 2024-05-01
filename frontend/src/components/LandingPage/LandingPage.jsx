import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signUpUser } from "../../store/session";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { createCart } from "../../store/cart";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const user = useSelector((store) => store.session.user);

  useEffect(() => {
    if (user) navigate('/products')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        const errs = {};
        errs.password = "Password and Confirm Password are not matching";
        setErrors(errs);
      } else if (password.length < 6) {
        const errs = {};
        errs.password = "Password must be at least 6 characters";
        setErrors(errs);
      } else {
        const userInfo = { first_name, last_name, phone, email, password };
        const newUser = await dispatch(signUpUser(userInfo));
        await dispatch(createCart(newUser.id))
        navigate("/products");
      }
    } catch (error) {
      const data = await error.json();
      setErrors(data.errors);
    }
  };

  return (
    <>
      <div className="SignUpFormContainer">
        <div className="SignUpLeft">
          <h1>Welcome to The Phone Hub</h1>
          <p>Sign Up and Earn up to 18% Rebate!</p>
        </div>
        <div className="SignUpRight">
          <h2 className="SignUpNow">Sign Up Now!</h2>
          <form className="SignUpForm" onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {errors.first_name && (
              <p className="errormsg">{errors.first_name}</p>
            )}
            <label>Last Name:</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.last_name && <p className="errormsg">{errors.last_name}</p>}
            <label>Phone Number:</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p className="errormsg">{errors.phone}</p>}
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="errormsg">{errors.email}</p>}
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="errormsg">{errors.password}</p>}
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="SNButton">
              Sign Up Now!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

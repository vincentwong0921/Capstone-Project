import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store/session";
import "./LoginModal.css";

function LoginModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      closeModal();
    } catch (res) {
        const data = await res.json()
        if (data?.message) {
            setErrors({ message: "The provided credentials were invalid."})
        }
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(
      login({
        email: "demo@user.io",
        password: "password2",
      })
    );
    closeModal();
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    await dispatch(
      login({
        email: "admin@user.io",
        password: "password",
      })
    );
    closeModal();
  };

  return (
    <>
      <div className="LoginFormContainer">
        <form onSubmit={handleSubmit}>
          <h1 className="Welcome">Welcome Back</h1>
          {errors.message && <div className="errormsg">{errors.message}</div>}
          <div className="emailContainer">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="passwordContainer">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="LgButton" type="submit">
            Log In
          </button>
          <div className="DemoLogins">
            <button onClick={adminLogin} className="AdminUserButton">
              Log in as Admin
            </button>
            <button onClick={demoLogin} className="DemoUserButton">
              Log in as Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginModal;

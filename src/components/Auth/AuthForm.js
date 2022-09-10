import { useRef, useState } from "react";
import Card from "../UI/Card";
import styles from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [hasAccount, setHasAccount] = useState(true);
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const usernameInputRef = useRef("");

  const nonDomClear = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (usernameInputRef.current) {
      usernameInputRef.current.value = "";
    }
  };
  const changeHandler = (e) => {
    e.preventDefault();
    nonDomClear();
    setHasAccount((prev) => (prev = !prev));
  };

  let info = {};
  const signInHandler = (e) => {
    e.preventDefault();
    info = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    if (hasAccount) {
      props.onAuth(info, true);
    }
    nonDomClear();
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    info = {
      email: emailInputRef.current.value,
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    props.onAuth(info, false);
    nonDomClear();
  };

  if (!hasAccount) {
    return (
      <Card>
        <form className={styles.form} onSubmit={signUpHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={usernameInputRef} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
          <button>Create Account</button>
          <p className={styles.change} onClick={changeHandler}>
            You have an existing account?
          </p>
        </form>
      </Card>
    );
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={signInHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <button>Login</button>
        <p className={styles.change} onClick={changeHandler}>
          You don't have an account?
        </p>
      </form>
    </Card>
  );
};

export default AuthForm;

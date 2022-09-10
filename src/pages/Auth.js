import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { userActions } from "../store/user-slice";
import { uiActions } from "../store/ui-slice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = (info, hasAccount) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Verifying",
        message: "Verifying the user...",
      })
    );
    let url;
    if (!hasAccount) {
      // datayı gönder
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl0bF2-Ie3QGH6G02kpY4u0FijtbMSoiY";
    } else {
      // datayı doğrula
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl0bF2-Ie3QGH6G02kpY4u0FijtbMSoiY";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: info.email,
        displayName: info.username,
        password: info.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(
          userActions.auth({
            email: data.email,
            token: data.idToken,
            username: data.displayName,
          })
        );
        dispatch(uiActions.hideNotification());
        navigate("/");
      })
      .catch((err) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "ERROR",
            message: err.message,
          })
        );
      });
  };

  return <AuthForm onAuth={authUser} />;
};

export default Auth;

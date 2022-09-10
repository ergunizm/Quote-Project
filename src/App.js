import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import Auth from "./pages/Auth";
import QuoteDetail from "./pages/QuoteDetail";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Notification from "./components/UI/Notification";
import { userActions } from "./store/user-slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getFromStorage());
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const notificationInfo = useSelector((state) => state.ui.notification);

  return (
    <BrowserRouter>
      {notificationInfo && (
        <Notification
          title={notificationInfo.title}
          message={notificationInfo.message}
          status={notificationInfo.status}
        />
      )}
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/quotes" />} />
        <Route path="/quotes" element={<AllQuotes />}></Route>
        {isLoggedIn && <Route path="/new-quote" element={<NewQuote />}></Route>}
        {!isLoggedIn && (
          <Route path="/new-quote" element={<Navigate replace to="/login" />} />
        )}
        {!isLoggedIn && <Route path="/login" element={<Auth />}></Route>}
        {isLoggedIn && (
          <Route path="/login" element={<Navigate replace to="/profile" />} />
        )}
        {isLoggedIn && <Route path="/profile" element={<UserProfile />} />}
        {!isLoggedIn && (
          <Route path="/profile" element={<Navigate replace to="/login" />} />
        )}
        <Route path="/quotes/:quoteId" element={<QuoteDetail />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// login bilgisini localhostta sakla, sayfa yenilendiğinde veya url yazarak gittiğinde login ekranına atmasın

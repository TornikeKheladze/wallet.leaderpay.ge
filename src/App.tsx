import { Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import BlankLayout from "./components/layout/BlankLayout";
import Settings from "./pages/Settings/Settings";
import Transfer from "./pages/Transfer/Transfer";
import WithDraw from "./pages/Withdraw/Withdraw";
import Templates from "./pages/Templates/Templates";
import Exchange from "./pages/Exchange/Exchange";
import Profile from "./pages/Profile/Profile";
import ServiceByCategory from "./pages/Services/ServiceByCategory/ServiceByCategory";
import ServiceCategories from "./pages/Services/ServiceCategories/ServiceCategories";
import Service from "./pages/Services/Service/Service";
import Info from "./pages/info/Info";
import News from "./pages/News/News";
import SingleNews from "./pages/News/SingleNew";
import SendMoney from "./pages/SendMoney/SendMoney";
import Register from "./pages/Register/Register";
import Identomat from "./pages/Register/Identomat";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
import Verification from "./pages/Verification/Verification";
import VerificationStep2 from "./pages/Verification/VerificationStep2";
import Cashout from "./pages/Cashout/Cashout";
import AddBalance from "./pages/AddBalance/AddBalance";
import QRCashout from "./pages/QRCashout/QRCashout";

const route = (
  path: string,
  element: ReactNode,
  blank?: "blank",
  login?: boolean
) => (
  <Route
    path={path}
    element={
      blank ? (
        <BlankLayout login={login}>{element}</BlankLayout>
      ) : (
        <Layout>{element}</Layout>
      )
    }
  />
);

function App() {
  return (
    <Routes>
      {route("/", <Login />, "blank")}
      {route("/register", <Register />, "blank")}
      <Route path={"register/identomat"} element={<Identomat />} />
      {route("/pages/:page", <Info />, "blank", true)}
      {route("/news", <News />, "blank", true)}
      {route("/news/:id", <SingleNews />, "blank", true)}
      {route("/passwordReset", <PasswordReset />, "blank")}
      {route("/home", <Home />)}
      {route("/services", <ServiceCategories />)}
      {route("/services/category/:id", <ServiceByCategory />)}
      {route("/services/:id", <Service />)}
      {route("/guest/services", <ServiceCategories />, "blank", true)}
      {route(
        "/guest/services/category/:id",
        <ServiceByCategory />,
        "blank",
        true
      )}
      {route("/guest/services/:id", <Service />, "blank", true)}
      {route("/settings", <Settings />)}
      {route("/transfer", <Transfer />)}
      {route("/transfer/withdraw", <WithDraw />)}
      {route("/transfer/sendMoney", <SendMoney />)}
      {route("/transfer/exchange", <Exchange />)}
      {route("/transfer/cashout", <Cashout />)}
      {route("/transfer/addBalance", <AddBalance />)}
      {route("/transfer/qrCashout", <QRCashout />)}
      {route("/templates", <Templates />)}
      {route("/profile", <Profile />)}
      {route("/profile/passwordChange", <PasswordChange />)}
      {route("/profile/verification", <Verification />)}
      <Route
        path={"/profile/verification/step2"}
        element={<VerificationStep2 />}
      />
    </Routes>
  );
}

export default App;

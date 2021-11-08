import "./App.css";
import "antd/dist/antd.css";
import Homepage from "./homepage/homepage.jsx";
import Subpage from "./subpage/subpage";
import LoginForm from "./login/LoginForm";
import SignUpForm from "./login/SignUpForm";
import User from "./userpage/User";
import Cart from "./cart/Cart";
import { Route, Routes } from "react-router";
import Detail from "./detail/Detail";
import AddressAPI from "./userpage/api/AddressAPI";

function App() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Homepage />
              <div>Hello</div>
            </>
          }
        />
        <Route
          path="/Science"
          element={<Subpage title="이과대학" category="자연" />}
        />
        <Route
          path="/Liberalart"
          element={<Subpage title="문과대학" category="사회과학" />}
        />
        <Route
          path="/Economics"
          element={<Subpage title="상경대학" category="상경" />}
        />
        <Route
          path="/Engineering"
          element={<Subpage title="공과대학" category="공학" />}
        />
        <Route
          path="/Medicine"
          element={<Subpage title="의과대학" category="의예" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/api" element={<AddressAPI />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;

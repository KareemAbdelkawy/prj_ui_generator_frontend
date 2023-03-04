import React from "react";
import { useState } from "react";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const [signUpModal, setSignUpModal] = useState(false);

  return (
    <header>
      <SignUpModal signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
      <div
        className="header-inner"
        style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
      >
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <img src="./rocketAi.png" alt="UI generator tool" />
          UI generator tool.
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">discover</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Demo</a>
            </li>
            <li>
              <a onClick={() => setSignUpModal(true)} href="#">
                Login
              </a>
            </li>
            {/* <li className='btn'>
              <a href='/'>order</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

import React from "react";
import { useState } from "react";
import SignUpModal from "./SignUpModal";
import PricingTemplateModal from "./PricingTemplateModal";


export default function Header() {
  const [signUpModal, setSignUpModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = (values, selectedPlan) => {
    console.log("Submitted values: ", values);
    console.log("Selected plan: ", selectedPlan);
    setModalVisible(false);
  };

  return (
    <header>
      <SignUpModal signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
      <PricingTemplateModal
        visible={modalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
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
              <a onClick={() => setModalVisible(true)} href="#">Pricing</a>
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

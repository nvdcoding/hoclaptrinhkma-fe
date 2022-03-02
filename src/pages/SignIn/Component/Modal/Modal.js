import React from "react";

function Modal(props) {
  const sendData = () => {
    props.parentCallback(true);
  };
  return (
    <>
      <div className="Modal-main">
        <div onClick={sendData}>
          <img
            alt="icon"
            src="https://fullstack.edu.vn/assets/images/signin/personal-18px.svg"
          ></img>
          <span>Sử dụng Email/ Số điện thoại</span>
        </div>
        <div>
          <img
            alt="icon"
            src="https://fullstack.edu.vn/assets/images/signin/google-18px.svg"
          ></img>
          <span>Tiếp tục với Google</span>
        </div>
        <div>
          <img
            alt="icon"
            src="https://fullstack.edu.vn/assets/images/signin/facebook-18px.svg"
          ></img>
          <span>Tiếp tục với Facebook</span>
        </div>
        <div>
          <img
            alt="icon"
            src="https://fullstack.edu.vn/assets/images/signin/github-18px.svg"
          ></img>
          <span>Tiếp tục với Github</span>
        </div>
      </div>
    </>
  );
}

export default Modal;

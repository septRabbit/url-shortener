import React, { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { QRCode } from "react-qr-svg";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function Result() {
  let location = useLocation();
  const history = useHistory();
  const shortURL = location.state.data?.short;

  let myInput = null;
  const copyToClipboard = () => {
    myInput.select();
    document.execCommand("copy");
    alert("Copied BurgerURL : " + myInput.value);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-center pb-12 md:text-left md:pl-20 pt-16 text-2.5xl text-white lg:text-5xl font-bold">
        BugerURL
      </h1>

      <div className="px-6 md:px-20 grid lg:grid-cols-2 place-content-center gap-10 md:gap-20 max-w-screen-xl mx-auto">
        <section className="text-white my-auto text-center lg:text-left space-y-8 lg:space-y-8">
          <h1 className="text-2xl lg:text-4xl font-bold">
            Best URL Shortening WebApp
          </h1>

          <p className="text-base"> Easy Link Shortening</p>
        </section>

        <div className="space-y-8 flex flex-col justify-center items-center md:mx-1">
          <div className="flex flex-row items-center">
            <input
              readOnly
              className="border border-blue-400 w-80 px-3 py-2 rounded-lg text-gray-600 bg-white"
              value={shortURL}
              ref={(ref) => (myInput = ref)}
            />

            <button
              onClick={copyToClipboard}
              className="ml-2 bg-white py-1.5 px-3 rounded-lg"
            >
              <i className="far fa-copy text-xl text-gray-700"></i>
            </button>
          </div>

          <QRCode
            className="border-2 border-white p-2 rounded-md"
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 220 }}
            value={shortURL}
          />
          <button
            onClick={() => history.push("/")}
            className="border-2 border-white text-white p-2 rounded-xl"
          >
            Shorten a new URL
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;

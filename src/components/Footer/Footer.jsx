import React from "react";
import amazonPayLogo from "../../assets/images/amazon-pay.png";
import amricanExpressLogo from "../../assets/images/American-Express-Color.png";
import mastercardPayLogo from "../../assets/images/mastercard.webp";
import paypalPayLogo from "../../assets/images/paypal.png";
import googlePlay from "../../assets/images/get-google-play.png";
import appStore from "../../assets/images/get-apple-store.png";
export default function Footer() {
  return (
    <>
      <footer className=" bg-gray-100 px-2 bottom-0 py-4 absolute start-0 end-0">
        <div className="mx-auto container">
          <h2 className="text-2xl font-semibold">Get the FreshCart App</h2>
          <p className="my-3">
            We will send you a link, open it on your phone to download the app{" "}
          </p>

          <div className="flex gap-4">
            <input
              type="text"
              className="form-control flex-grow"
              placeholder="Email...."
            />
            <button className="btn">app link</button>
          </div>

          <div className="flex flex-wrap justify-between items-center p-2 my-3">
            <div className=" flex flex-wrap w-full mb-2 md:mb-0 md:w-1/2   gap-2 items-center">
              <span className="font-semibold">Payments Partners</span>
              <div className="flex flex-wrap gap-2 items-center">
                <img src={amazonPayLogo} className="w-16" alt="" />
                <img src={amricanExpressLogo} className="w-16" alt="" />
                <img src={mastercardPayLogo} className="w-16" alt="" />
                <img src={paypalPayLogo} className="w-16" alt="" />
              </div>
            </div>
            <div className="flex flex-wrap w-full  md:w-1/2 gap-2 items-center">
              <span className="font-semibold">Get deliveries with FreshCart</span>
              <div className="flex gap-2 items-center">
                <img src={googlePlay} className="w-16" alt="" />
                <img src={appStore} className="w-16" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

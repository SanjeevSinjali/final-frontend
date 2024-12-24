import React from "react";
import {
  FaAngleRight,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaX,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-mainColor w-full">
        <div className="max-w-7xl m-auto">
          <div className="w-full flex flex-wrap justify-between items-start px-5 gap-8 text-white">
            <div className="py-6 text-sm flex flex-col gap-5">
              <h6 className="text-lg font-medium">Quick Links</h6>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/">
                    <p>Home</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/about">
                    <p>About Us</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/jobs">
                    <p>All Jobs</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/contact">
                    <p>Contact Us</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/jobs">
                    <p>Filter Search</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="py-6 text-sm flex flex-col gap-5">
              <h6 className="text-lg font-medium">Extra Links</h6>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="#">
                    <p>Account</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="/register">
                    <p>Register</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="#">
                    <p>Post Job</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaAngleRight />
                  <Link to="#">
                    <p>Dashboard</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="py-6 text-sm flex flex-col gap-5">
              <h6 className="text-lg font-medium">Follow Us</h6>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-center justify-start">
                  <FaFacebook />
                  <Link to="#">
                    <p>Facebook</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaXTwitter />
                  <Link to="#">
                    <p>Twitter</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaInstagram />
                  <Link to="#">
                    <p>Instagram</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaLinkedin />
                  <Link to="#">
                    <p>Linkedin</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="py-6 text-sm flex flex-col gap-5">
              <h6 className="text-lg font-medium">Contact Us</h6>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-center justify-start">
                  <FaLocationDot />
                  <Link to="#">
                    <p>Bharatpur-12, Chitwan</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaPhone />
                  <Link to="#">
                    <p>About Us</p>
                  </Link>
                </li>
                <li className="flex gap-3 items-center justify-start">
                  <FaEnvelope />
                  <Link to="#">
                    <p>jobpros@info.com.np</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="w-full text-copyright text-sm text-center py-4">
        &copy; Copyright@2024 by JobPros Team | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;

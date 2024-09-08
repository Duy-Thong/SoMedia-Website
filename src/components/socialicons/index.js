import React from "react";
import "./style.css";
import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { FaThreads } from "react-icons/fa6";

import { socialprofils } from "../../content_option";

export const Socialicons = () => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {socialprofils.facebook && (
          <li>
            <a href={socialprofils.facebook}>
              <FaFacebookF />
            </a>
          </li>
        )}
        {socialprofils.instagram && (
          <li>
            <a href={socialprofils.instagram}>
              <FaInstagram />
            </a>
          </li>
        )}
        {socialprofils.threads && (
          <li>
            <a href={socialprofils.threads}>
              <FaThreads />
            </a>
          </li>
        )}
        {socialprofils.tiktok && (
          <li>
            <a href={socialprofils.tiktok}>
              <FaTiktok />
            </a>
          </li>
        )}

        {socialprofils.youtube && (
          <li>
            <a href={socialprofils.youtube}>
              <AiFillYoutube />
            </a>
          </li>
        )}


      </ul>
      <p style={{ fontSize: "15px" }}>Follow Us</p>
    </div>
  );
};

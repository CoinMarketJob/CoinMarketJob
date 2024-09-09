"use client";
import React, { useState } from "react";
import styles from "./Footer.module.css";
import Icon from "../general/Icon";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Footer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Settings = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push("/settings");
  };

  const SavedJobs = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (session) {
      router.push("/savedjobs");
    } else {
      setErrorMessage("Please log in to view saved jobs");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className={styles.FooterContainer}>
      <Icon onClick={Settings} hoverContent="Settings" hoverSize={47.59}>
        <svg
          width="31"
          height="29"
          viewBox="0 0 31 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0281 0H17.356L19.683 3.33854C19.846 3.57902 20.1573 3.6922 20.4686 3.63561L24.2184 2.80098L27.4347 5.87073L26.575 9.4639C26.5009 9.74683 26.6343 10.0439 26.8863 10.2137L30.3842 12.4346V16.5654L26.8863 18.7863C26.6343 18.9561 26.5009 19.2532 26.575 19.5361L27.4347 23.1293L24.2184 26.199L20.4686 25.3644C20.1573 25.3078 19.846 25.421 19.683 25.6615L17.356 29H13.0281L10.6863 25.6615C10.5233 25.421 10.212 25.3078 9.91561 25.3644L6.15094 26.199L2.93467 23.1293L3.79432 19.5361C3.86842 19.2532 3.74985 18.9561 3.48306 18.7863L0 16.5654V12.4346L3.48306 10.2137C3.74985 10.0439 3.86842 9.74683 3.79432 9.4639L2.93467 5.87073L6.15094 2.80098L9.91561 3.63561C10.212 3.6922 10.5233 3.57902 10.6863 3.33854L13.0281 0ZM14.614 2.82927L13.1615 4.90878C12.3019 6.12537 10.7456 6.71951 9.24864 6.39415L7.0847 5.91317L6.19541 6.76195L6.68452 8.82732C7.04023 10.2561 6.41773 11.7556 5.12825 12.562L2.96431 13.9483V15.0517L5.12825 16.438C6.41773 17.2444 7.04023 18.7439 6.68452 20.1727L6.19541 22.238L7.0847 23.0868L9.24864 22.6059C10.7456 22.2805 12.3019 22.8746 13.1615 24.0912L14.614 26.1707H15.7701L17.2078 24.0912C18.0675 22.8746 19.6237 22.2805 21.1355 22.6059L23.2846 23.0868L24.1888 22.238L23.6848 20.1727C23.3439 18.7439 23.9516 17.2444 25.2411 16.438L27.4199 15.0517V13.9483L25.2411 12.562C23.9516 11.7556 23.3439 10.2561 23.6848 8.82732L24.1888 6.76195L23.2846 5.91317L21.1355 6.39415C19.6237 6.71951 18.0675 6.12537 17.2078 4.90878L15.7701 2.82927H14.614ZM15.1921 12.378C13.9619 12.378 12.9689 13.3259 12.9689 14.5C12.9689 15.6741 13.9619 16.622 15.1921 16.622C16.4074 16.622 17.4153 15.6741 17.4153 14.5C17.4153 13.3259 16.4074 12.378 15.1921 12.378ZM10.0045 14.5C10.0045 11.7698 12.3167 9.54878 15.1921 9.54878C18.0526 9.54878 20.3796 11.7698 20.3796 14.5C20.3796 17.2302 18.0526 19.4512 15.1921 19.4512C12.3167 19.4512 10.0045 17.2302 10.0045 14.5Z"
            fill="#BBBBBB"
            className="svg-icon"
            fill-opacity="0.733333"
          />
        </svg>
      </Icon>

      <Icon onClick={SavedJobs} hoverSize={47.59} hoverContent="Save">
        <svg
          width="21"
          height="28"
          viewBox="0 0 21 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 2.62525C0 1.1759 1.1759 0 2.62526 0V2.62525V24.1414L9.74079 19.0604C10.1947 18.7323 10.8128 18.7323 11.2667 19.0604L18.3768 24.1414V2.62525H2.62526V0H18.3768C19.8262 0 21.002 1.1759 21.002 2.62525V26.6901C21.002 27.1823 20.7286 27.6308 20.291 27.855C19.8535 28.0793 19.3284 28.041 18.9292 27.7566L10.501 21.7404L2.07286 27.7566C1.6736 28.041 1.14855 28.0793 0.711007 27.855C0.273464 27.6308 0 27.1823 0 26.6901V2.62525Z"
            fill="#242220"
            className="svg-icon"
            fill-opacity="0.2"
          />
        </svg>
      </Icon>
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Footer;

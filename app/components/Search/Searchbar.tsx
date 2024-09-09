"use client";
import React, { useState } from "react";
import "./Searchbar.css";
import Icon from "../general/Icon";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";
import JobFilterPopUp from "../jobfilter/Job";

import { useSession } from "next-auth/react";
const Searchbar = () => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const back = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.back();
  };

  const forward = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.forward();
  };

  const home = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push("/");
    setIsFilterOpen(false);
  };

  const postajob = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push("/postajob");
  };

  return (
    <div className="search-container-div">
      {errorMessage && <div className="ErrorMessage">{errorMessage}</div>}
      <div className="home-button">
        <Icon onClick={home} marginLeft={60} hoverSize={51} hoverContent="Home">
          <svg
            width="31"
            height="35"
            viewBox="0 0 31 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.07105 32.8617H10.2178V21.0645C10.2178 20.5626 10.3857 20.1382 10.7215 19.7915C11.0574 19.4444 11.4684 19.2708 11.9545 19.2708H18.8588C19.3285 19.2708 19.7318 19.4444 20.0687 19.7915C20.4057 20.1382 20.5742 20.5626 20.5742 21.0645V32.8617H28.7209V12.8947C28.7209 12.6572 28.6706 12.442 28.57 12.2489C28.469 12.0559 28.3324 11.885 28.16 11.7364L16.2161 2.45048C15.9857 2.24275 15.7124 2.13889 15.396 2.13889C15.0796 2.13889 14.8062 2.24275 14.5759 2.45048L2.632 11.7364C2.4596 11.885 2.32292 12.0559 2.22194 12.2489C2.12135 12.442 2.07105 12.6572 2.07105 12.8947V32.8617ZM0 32.8617V12.9022C0 12.3308 0.118175 11.7962 0.354524 11.2985C0.590873 10.8008 0.932869 10.385 1.38051 10.051L13.3249 0.712962C13.9397 0.237654 14.6292 0 15.3932 0C16.1572 0 16.8485 0.237654 17.467 0.712962L29.4115 10.051C29.8591 10.385 30.2011 10.8008 30.4374 11.2985C30.6738 11.7962 30.792 12.3308 30.792 12.9022V32.8617C30.792 33.4335 30.5852 33.9328 30.1715 34.3594C29.7583 34.7865 29.2748 35 28.7209 35H20.2398C19.7537 35 19.3427 34.8266 19.0069 34.4799C18.6707 34.1332 18.5026 33.7088 18.5026 33.2069V21.4097H12.2894V33.2069C12.2894 33.7088 12.1211 34.1332 11.7846 34.4799C11.448 34.8266 11.0452 35 10.5763 35H2.06151C1.51514 35 1.03496 34.7865 0.620978 34.3594C0.206993 33.9328 0 33.4335 0 32.8617Z"
              fill="#242220"
              className="svg-icon"
              fill-opacity="0.4"
            />
          </svg>
        </Icon>
      </div>
      <div className="main-container">
        <Icon onClick={back} hoverSize={45} hoverContent="Back">
          <svg
            width="16"
            height="29"
            viewBox="0 0 16 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29487 14.4688L14.8961 27.0707C15.1398 27.3144 15.2709 27.5515 15.2894 27.7819C15.3074 28.0128 15.177 28.2704 14.8983 28.5549C14.619 28.8393 14.3718 28.9875 14.1565 28.9993C13.9418 29.0112 13.6749 28.8668 13.3558 28.5663L0.60167 15.8114C0.424835 15.5976 0.280236 15.3838 0.167877 15.17C0.0559922 14.9561 5.15829e-05 14.7177 5.15829e-05 14.4546C5.15829e-05 14.1914 0.0564681 13.952 0.169301 13.7363C0.282134 13.5211 0.42768 13.3241 0.605936 13.1454L13.3515 0.403317C13.6369 0.117916 13.8844 -0.0160118 14.094 0.00152814C14.3035 0.018597 14.5479 0.169358 14.8271 0.45381C15.1059 0.738263 15.2453 0.986683 15.2453 1.19907C15.2453 1.41147 15.1052 1.65776 14.825 1.93794L2.29487 14.4688Z"
              fill="#242220"
              className="svg-icon"
              fill-opacity="0.4"
            />
          </svg>
        </Icon>
        <Icon
          onClick={forward}
          marginRight={15}
          marginLeft={15}
          hoverSize={45}
          hoverContent="Forward"
        >
          <svg
            width="16"
            height="29"
            viewBox="0 0 16 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9961 14.5312L0.394896 1.92926C0.151215 1.68558 0.0201298 1.44853 0.00164037 1.21813C-0.016375 0.987246 0.113999 0.72958 0.392763 0.445128C0.672 0.160675 0.919236 0.0125228 1.13447 0.000670619C1.34923 -0.0111816 1.61615 0.13318 1.93521 0.433751L14.6893 13.1886C14.8662 13.4024 15.0108 13.6162 15.1231 13.83C15.235 14.0439 15.291 14.2823 15.291 14.5454C15.291 14.8086 15.2345 15.048 15.1217 15.2637C15.0089 15.4789 14.8633 15.6759 14.6851 15.8546L1.93947 28.5967C1.65407 28.8821 1.4066 29.016 1.19705 28.9985C0.987505 28.9814 0.743113 28.8306 0.463876 28.5462C0.185112 28.2617 0.0457302 28.0133 0.0457302 27.8009C0.0457302 27.5885 0.185823 27.3422 0.466009 27.0621L12.9961 14.5312Z"
              fill="#242220"
              className="svg-icon"
              fill-opacity="0.4"
            />
          </svg>
        </Icon>
        <div style={{ width: "34.34vw" }}>
          <SearchInput
            tags={tags}
            setTags={setTags}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
        <Icon
          onClick={postajob}
          marginLeft={35}
          hoverSize={45}
          hoverContent="Post a job"
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2917 15.7083H1.20833C0.865972 15.7083 0.578993 15.5923 0.347396 15.3603C0.115799 15.1283 0 14.841 0 14.4982C0 14.1554 0.115799 13.8686 0.347396 13.6379C0.578993 13.4071 0.865972 13.2917 1.20833 13.2917H13.2917V1.20833C13.2917 0.865972 13.4077 0.578993 13.6397 0.347396C13.8717 0.115799 14.159 0 14.5018 0C14.8446 0 15.1314 0.115799 15.3621 0.347396C15.5929 0.578993 15.7083 0.865972 15.7083 1.20833V13.2917H27.7917C28.134 13.2917 28.421 13.4077 28.6526 13.6397C28.8842 13.8717 29 14.159 29 14.5018C29 14.8446 28.8842 15.1314 28.6526 15.3621C28.421 15.5929 28.134 15.7083 27.7917 15.7083H15.7083V27.7917C15.7083 28.134 15.5923 28.421 15.3603 28.6526C15.1283 28.8842 14.841 29 14.4982 29C14.1554 29 13.8686 28.8842 13.6379 28.6526C13.4071 28.421 13.2917 28.134 13.2917 27.7917V15.7083Z"
              fill="#242220"
              className="svg-icon"
              fill-opacity="0.4"
            />
          </svg>
        </Icon>
      </div>
    </div>
  );
};

export default Searchbar;

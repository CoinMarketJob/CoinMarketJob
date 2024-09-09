/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import EditClient from "../components/postajob/EditClient";
import { JSONContent } from "@tiptap/react";
import ReviewClient from "../components/postajob/ReviewClient";
import CheckoutClient from "../components/postajob/CheckoutClient";
import { useRouter } from "next/navigation";
import { useProfileData } from "@/hooks/useProfileData";
import { uploadFile } from "@/utils/s3Operations"; // S3 yükleme fonksiyonunu import edin

const Page = () => {
  const [page, setPage] = useState<number>(0);

  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [jobType, setJobType] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [educationalDegree, setEducationalDegree] = useState<string>("");
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [single, setSingle] = useState<string>("");
  const [visa, setVisa] = useState<boolean | undefined>(false);
  const [showSalary, setShowSalary] = useState<boolean>(false);
  const [unitSalary, setUnitSalary] = useState<string>("Year");
  const [questions, setQuestions] = useState<string[]>([]);
  const [description, setDescription] = useState<JSONContent>(JSON);

  const [jobTitle, setJobTitle] = useState<string>("");
  const [locationType, setLocationType] = useState<string>("Remote");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [oneJobIsChecked, setOneJobIsChecked] = useState<boolean>(true);
  const [monthlyChecked, setMonthlyChecked] = useState<boolean>(false);
  const [fiveJobChecked, setFiveJobChecked] = useState<boolean>(false);

  const { companyProfileData, setCompanyProfileData } = useProfileData();
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Complete = async () => {
    setUploading(true);
    try {
      let logoURL = "";

      // Eğer yeni bir logo seçildiyse, S3'e yükle
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("Content-Type", selectedImage.type);

        const response = await fetch("/api/profileimage/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          logoURL = data.url;
        } else {
          setErrorMessage(
            "An unexpected error has occurred. Please try again later."
          );
          setUploading(false);
        }
      }

      const jobData = {
        PackageType: oneJobIsChecked
          ? "OneJob"
          : monthlyChecked
          ? "Monthly"
          : "FiveJob",
        logo: selectedImage ? logoURL : "",
        companyName: companyName,
        jobTitle,
        location: selectedLocations[0],
        jobType: jobType ? jobType : null,
        experienceLevel: experienceLevel ? experienceLevel : null,
        educationalDegree: educationalDegree ? educationalDegree : null,
        visaSponsorship: visa,
        salaryMin: min,
        salaryMax: max,
        jobDescription: description,
        questions: questions,
        showSalary,
        single,
        unitSalary,
        locationType,
      };

      const response = await fetch("/api/job/", {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Error Posting for job:", response.statusText);

        setErrorMessage(
          "An unexpected error has occurred. Please try again later."
        );
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error in submission process:", error);
    }
  };

  return (
    <div className={styles.Container}>
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
      <div className={styles.indicatorContainer}>
        <div
          className={`${styles.indicator} ${styles.indicatorMargin} ${
            page === 0 ? styles.selectedIndicator : ""
          }`}
          onClick={() => setPage(0)} // No restriction for going back to the first page
        ></div>
        <div
          className={`${styles.indicator} ${styles.indicatorMargin} ${
            page === 1 ? styles.selectedIndicator : ""
          }`}
          onClick={() => {
            if (jobTitle) {
              // Only allow advancing if fields are filled
              setPage(1);
            }
          }}
        ></div>
        <div
          className={`${styles.indicator} ${
            page === 2 ? styles.selectedIndicator : ""
          }`}
          onClick={() => {
            if (jobTitle) {
              // Only allow advancing if fields are filled
              setPage(2);
            }
          }}
        ></div>
      </div>

      {page === 0 ? (
        <EditClient
          image={"/image.png"}
          companyName={companyName}
          setCompanyName={setCompanyName}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          locationType={locationType}
          setLocationType={setLocationType}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          jobType={jobType}
          setJobType={setJobType}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          educationalDegree={educationalDegree}
          setEducationalDegree={setEducationalDegree}
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          unit={unitSalary}
          setUnit={setUnitSalary}
          visa={visa}
          setVisa={setVisa}
          single={single}
          setSingle={setSingle}
          questions={questions}
          setQuestions={setQuestions}
          showSalary={showSalary}
          setShowSalary={setShowSalary}
          description={description}
          setDescription={setDescription}
          setPage={setPage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      ) : page === 1 ? (
        <ReviewClient
          image={selectedImage}
          companyName={companyName}
          jobTitle={jobTitle}
          selectedLocations={selectedLocations}
          jobType={jobType}
          experienceLevel={experienceLevel}
          educationalDegree={educationalDegree}
          min={min}
          max={max}
          visa={visa}
          description={description}
          setPage={setPage}
          locationType={locationType}
          unit={unitSalary}
          single={single}
          showSalary={showSalary}
          questions={questions}
        />
      ) : (
        <CheckoutClient
          oneJobIsChecked={oneJobIsChecked}
          setOneJobIsChecked={setOneJobIsChecked}
          monthlyChecked={monthlyChecked}
          setMonthlyChecked={setMonthlyChecked}
          fiveJobChecked={fiveJobChecked}
          setFiveJobChecked={setFiveJobChecked}
          Complete={Complete}
          uploading={uploading}
        />
      )}
    </div>
  );
};

export default Page;

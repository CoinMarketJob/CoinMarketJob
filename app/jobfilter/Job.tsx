"use client"
import React, { useState, useEffect, useCallback, useRef, use } from 'react';
import './Job.css'; 
import { useJobs } from '@/hooks/useJobs';
import Selection from '../components/general/CheckboxSelection';
import RangeSlider from '../components/general/Slider';
import ToggleSwitch from '../components/general/Toggle';
import Button from '../components/general/Button';
import Dropdown from '../components/general/Dropdown';

const JobFilter: React.FC = () => {
  const { jobs, filteredJobs, setFilteredJobs } = useJobs();
  const [datePosted, setDatePosted] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([100, 800]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [visaSponsorship, setVisaSponsorship] = useState<boolean>(false);
  const [activelyHiring, setActivelyHiring] = useState<boolean>(false);
  const [isAlertSet, setIsAlertSet] = useState(false);
  const [chooseLocationValue, setchooseLocationValue] = useState('option1');
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const chooseLocationOptions = [
    { value: 'USA', label: 'USA' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  ];

  const dateOptions = [
    { id: 'last24Hours', label: 'Last 24 Hours' },
    { id: 'last3Days', label: 'Last 3 days' },
    { id: 'lastWeek', label: 'Last Week' },
    { id: 'last2Weeks', label: 'Last 2 Weeks' },
    { id: 'lastMonth', label: 'Last Month' }
  ];

  const locationOptions = [
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'Onsite' }
  ];

  const jobTypeOptions = [
    { id: 'internship', label: 'Internship' },
    { id: 'partTime', label: 'Part-time' },
    { id: 'fullTime', label: 'Full-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'temporary', label: 'Temporary' },
    { id: 'other', label: 'Other' }
  ];

  const salaryOptions = [
    { id: 'value', label: 'Value', sublabel: 'Under $100' },
    { id: 'midRange', label: 'Mid-range', sublabel: '$100-$200' },
    { id: 'highEnd', label: 'High-end', sublabel: 'Above $200' }
  ];

  const experienceLevelOptions = [
    { id: 'entryLevel', label: 'Entry-Level' },
    { id: 'junior', label: 'Junior' },
    { id: 'midLevel', label: 'Mid-Level' },
    { id: 'senior', label: 'Senior' },
    { id: 'lead', label: 'Lead' },
    { id: 'manager', label: 'Manager' },
    { id: 'executive', label: 'Executive' }
  ];

  const handleSalaryChange = (minValue: number, maxValue: number) => {
    setSalaryRange([minValue, maxValue]);
  };

  const handleAlertClick = () => {
    setIsAlertSet(!isAlertSet);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setchooseLocationValue(e.target.value);
  };

  const applyFilters = useCallback(() => {
    const filtered = jobs.filter(job => {
      const meetsLocation = location.length === 0 || location.includes(job.location);
      const meetsJobType = jobType.length === 0 || jobType.includes(job.jobType);
      const meetsExperienceLevel = experienceLevel.length === 0 || experienceLevel.includes(job.experienceLevel);
      const meetsSalary = job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1];
      const meetsVisaSponsorship = !visaSponsorship || job.visaSponsorship === visaSponsorship;

      return meetsLocation && meetsJobType && meetsExperienceLevel && meetsSalary && meetsVisaSponsorship;
    });

    setFilteredJobs(filtered);
    setIsPopupVisible(true);
  }, [jobs, location, jobType, experienceLevel, salaryRange, visaSponsorship, setFilteredJobs]);

  useEffect(() => {
    applyFilters();
  }, [jobs, datePosted, location, jobType, experienceLevel, salaryRange, visaSponsorship, activelyHiring, applyFilters]);

  

  const initialFiltersRef = useRef({
    datePosted: [],
    location: [],
    jobType: [],
    salary: [],
    salaryRange: [100, 800],
    experienceLevel: [],
    visaSponsorship: false,
    activelyHiring: false,
    isAlertSet: false
  });

  const checkIfFiltersChanged = useCallback(() => {
    const initialFilters = initialFiltersRef.current;
    const filtersChanged = 
      datePosted.length !== initialFilters.datePosted.length ||
      location.length !== initialFilters.location.length ||
      jobType.length !== initialFilters.jobType.length ||
      salary.length !== initialFilters.salary.length ||
      salaryRange[0] !== initialFilters.salaryRange[0] ||
      salaryRange[1] !== initialFilters.salaryRange[1] ||
      experienceLevel.length !== initialFilters.experienceLevel.length ||
      visaSponsorship !== initialFilters.visaSponsorship ||
      activelyHiring !== initialFilters.activelyHiring ||
      isAlertSet !== initialFilters.isAlertSet;
  
    setIsResetDisabled(!filtersChanged);
  }, [datePosted, location, jobType, salary, salaryRange, experienceLevel, visaSponsorship, activelyHiring, isAlertSet]);
  
  useEffect(() => {
    checkIfFiltersChanged();
  }, [datePosted, location, jobType, salary, salaryRange, experienceLevel, visaSponsorship, activelyHiring, checkIfFiltersChanged]);
  

  return (
    <>
    {isPopupVisible && (
    <div className="filter-wrapper">
        <div className="popup-content">
          <div className="filter-group">
            <div className="left-group">
              <Selection
                name="Date Posted"
                id="datePosted"
                value={datePosted}
                onChange={setDatePosted}
                list={dateOptions}
                multiple={false}
              />
              <div className="salary-experience">
                <Selection
                  name="Salary"
                  id="salary"
                  value={salary}
                  onChange={setSalary}
                  list={salaryOptions}
                  multiple={true}
                />
                <div className="custom-slider">
                  <RangeSlider
                    min={0}
                    max={1000}
                    step={1}
                    onRangeChange={handleSalaryChange}
                  />
                </div>
              </div>
              <div 
                className={`set-alert ${isAlertSet ? 'active' : ''}`} 
                onClick={handleAlertClick}
              >
              <span>Set Alert</span>
                {isAlertSet ? (
                  <svg className="plus-icon-active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg className="plus-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </div>
            </div>
            <div className="centered-group">
              <div className='Location-Selection' >
              <div className='Location-Selection-Selection' >
              <Selection
                name="Location"
                id="location"
                value={location}
                onChange={setLocation}
                list={locationOptions}
                multiple={true}
              />
               </div>
              <Dropdown 
                id="exampleDropdown"
                value={chooseLocationValue}
                onChange={handleDropdownChange}
                list={chooseLocationOptions}
                className="general-dropdown"
              />
              </div>
              <div className='experience-level' >
              <Selection
                name="Experience Level"
                id="experienceLevel"
                value={experienceLevel}
                onChange={setExperienceLevel}
                list={experienceLevelOptions}
                multiple={true}
              />
              </div>
            </div>
            <div className="right-aligned-group">
              <Selection
                name="Job Type"
                id="jobType"
                value={jobType}
                onChange={setJobType}
                list={jobTypeOptions}
                multiple={true}
              />
              <div className="toggles">
                <ToggleSwitch
                  title="Actively Hiring"
                  sliderName='slider1'
                  switchState={activelyHiring}
                  setSwitchState={setActivelyHiring}
                />
                <ToggleSwitch
                  title="Visa Sponsorship"
                  sliderName='slider2'
                  switchState={visaSponsorship}
                  setSwitchState={setVisaSponsorship}
                />
              </div>
              <div className="button-container">
                <Button 
                  text="Reset" 
                  onClick={() => {
                    setDatePosted([]);
                    setLocation([]);
                    setJobType([]);
                    setSalary([]);
                    setSalaryRange([100, 800]);
                    setExperienceLevel([]);
                    setVisaSponsorship(false);
                    setActivelyHiring(false);
                    setIsAlertSet(false);
                    setchooseLocationValue('Choose Location Value');
                    
                   
          
                  }} 
                  backgroundColor="#FFFFFF"
                  textColor={isResetDisabled ? "#00000099" : "#000000"}
                  borderLine={0}
                  clickedTextColor="#00000099"
                  hoverUnderlineText={true}
                />
                <Button 
                  text="Apply" 
                  onClick={() => {
                    applyFilters();
                    setIsPopupVisible(false);
                
                  }}
                  backgroundColor="#242220"
                  textColor="#FFFFFF"
                  clickedBackgroundColor='#242220CC'
                  hoverBackgroundColor='#242220'
                />
              </div>
            </div>
          </div>
          <div className="jobs-list">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-item">
                <h3>{job.jobTitle}</h3>
                <p>{job.companyName}</p>
                <p>{job.location}</p>
                <p>{job.salaryMin} - {job.salaryMax}</p>
                <p>{job.experienceLevel}</p>
                <p>{job.jobType}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )}
  </>
  );
};

export default JobFilter;

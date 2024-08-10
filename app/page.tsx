/* eslint-disable */
"use client";
import React, {useState,useEffect} from 'react'
import styles from './page.module.css';
import { useJobs } from '@/hooks/useJobs';
import { useLayout } from '@/hooks/useLayout';
import MainLayout from './components/layouts/MainLayout';

const Home = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();
  const { layout } = useLayout();

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchData() {
      try {
          const response = await fetch('/api/job/get');
          const data = await response.json();
          console.log(data);
          setJobs(data);
          setFilteredJobs(data);
          console.log(layout);
      } catch (error) {
          console.error('Veri getirme hatası:', error);
      }
    }

    fetchData();
  },[])

  return (
    <div style={{width: '100%'}}>
      <MainLayout filteredJobs={filteredJobs}  layout={layout} />
    </div>
  )
}

export default Home
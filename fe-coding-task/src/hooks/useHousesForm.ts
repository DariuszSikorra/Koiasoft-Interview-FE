import React, { useEffect, useState } from 'react'
import fetchQuartersList from 'services/quartersList.service';
import { useForm } from 'react-hook-form';
import { FormData, HouseTypesResponse, QuartersListResponse } from 'types/globalTypes';
import fetchHouseTypes from 'services/houseTypes.service';

const useHousesForm = () => {
    const [quartersListLoading, setQuartersListLoading] = useState(true);
    const [houseTypesLoading, setHouseTypesLoading] = useState(true)
    const [quartersList, setQuartersList] = useState<QuartersListResponse | null>(null);
    const [houseTypes, setHouseTypes] = useState<HouseTypesResponse | null>(null);
    const { control, handleSubmit, setValue } = useForm<FormData>();
    const [savedStatistics, setSavedStatistics] = useState<string | null>(
      localStorage.getItem("statistics")
    );
  
    // Pull quartersList from mockup data file
    useEffect(() => {
      // Simulate an asynchronous API call to fetch data
      const fetchData = async () => {
        try {
          const data = await fetchQuartersList();
          setQuartersList(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error loading data
        } finally {
          setQuartersListLoading(false); // Set loading to false regardless of success or failure
        }
      };
  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pull houseTypes from mockup data file
    useEffect(() => {
        // Simulate an asynchronous API call to fetch data
        const fetchData = async () => {
          try {
            const data = await fetchHouseTypes();
            setHouseTypes(data);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error loading data
          } finally {
            setHouseTypesLoading(false); // Set loading to false regardless of success or failure
          }
        };
    
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
  
    useEffect(() => {
      // Set default values or values from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const quartersParam = urlParams.get("quarters") || "2016K1-2021K4";
      const houseTypeParam = urlParams.get("houseType") || "02";
  
      setValue("quarters", quartersParam);
      setValue("houseType", houseTypeParam);
  
      // Fetch and display statistics based on URL parameters
      fetchStatistics(quartersParam, houseTypeParam);
    }, [setValue]);
  
    const onSubmit = (data: FormData) => {
      // Save statistics to local storage
      const statistics = `Quarters: ${data.quarters}, House Type: ${data.houseType}`;
      setSavedStatistics(statistics);
      localStorage.setItem("statistics", statistics);
  
      // Fetch and display statistics based on user input
      fetchStatistics(data.quarters, data.houseType);
    };
  
    const fetchStatistics = async (quarters: string, houseType: string) => {
      // Implement API request logic using the provided cURL example or any preferred method
      // Update the URL with the selected parameters
      const newUrl = `/statistics?quarters=${quarters}&houseType=${houseType}`;
      window.history.pushState(null, "", newUrl);
    };

    return {
        loading: quartersListLoading || houseTypesLoading,
        quartersList,
        houseTypes,
        savedStatistics,
        control,
        onSubmit,
        handleSubmit,
    }
}

export default useHousesForm
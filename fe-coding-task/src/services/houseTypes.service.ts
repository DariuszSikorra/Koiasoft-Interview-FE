import { HouseTypesResponse } from "types/globalTypes";


const fetchHouseTypes = (): Promise<HouseTypesResponse> => {
  // Simulate an API call by returning a Promise
  return new Promise((resolve) => {
    // Simulate some delay to mimic an asynchronous API call
    fetch("/houseTypes.json")
      .then((response) => response.json())
      .then((quartersList) => resolve(quartersList))
      .catch((error) => {
        console.error("Error fetching quarters list:", error);
        resolve([]);
      });
  });
};
export default fetchHouseTypes;

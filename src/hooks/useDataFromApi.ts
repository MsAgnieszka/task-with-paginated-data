import axios from "axios";
import { useCallback, useState } from "react";
import { DataType } from "../screens/MainPage";
import { DATA_URL, numberOfItemsToDisplayPerPage } from "../utils/constants";

export const useDataFromApi = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [items, setItems] = useState<DataType | DataType[]>([]);
console.log({currentPage})
  const getDataFromApi = useCallback(
    async (id?: number) => {
      try {
        let url = `${DATA_URL}?page=${currentPage}`;
        if (id) {
          url = `${DATA_URL}?page=1&id=${id}`;
        }
        const res = await axios.get(url);
        const { data, total_pages: totalPages } = res.data;
        // each page return 6 items and in task requirements was info
        // that filtering and pagination should be performed within the API, not on the frontend side
        // so if i could not change the response i decided to short displaying results to 5 items per page
        if (data.length > numberOfItemsToDisplayPerPage) {
          data.pop();
        }
        setItems(data);
        setTotalPages(totalPages);
      } catch (error) {
        alert(error);
      }
    },
    [currentPage]
  );
  return { getDataFromApi, items, currentPage, setCurrentPage, totalPages };
};

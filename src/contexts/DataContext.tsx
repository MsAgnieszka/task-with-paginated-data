import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { DATA_URL, numberOfItemsToDisplayPerPage } from "../utils/constants";
import { DataTypes } from "../utils/types";

type DataContextType = {
  getDataFromApi: (id?: number) => Promise<void>;
  items: DataTypes;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages?: number;
};

const initialState: DataContextType = {
  getDataFromApi: async () => {},
  items: [],
  currentPage: 1,
  setCurrentPage: () => {},
};

const DataContext = createContext<DataContextType>(initialState);

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [items, setItems] = useState<DataTypes>([]);

  const getDataFromApi = useCallback(
    async (id?: number) => {
      try {
        let url = `${DATA_URL}?page=${currentPage}`;
        if (id) {
          url = `${DATA_URL}?page=${currentPage}&id=${id}`;
        }
        const res = await axios.get(url);
        const { data, total_pages } = res.data;
        // each page return 6 items and in task requirements was info
        // that filtering and pagination should be performed within the API, not on the frontend side
        // so if i could not change the response i decided to short displaying results to 5 items per page
        if (data.length > numberOfItemsToDisplayPerPage) {
          console.log(
            "data.length - numberOfItemsToDisplayPerPage",
            data.length - numberOfItemsToDisplayPerPage
          );
          data.splice(-(data.length - numberOfItemsToDisplayPerPage));
        }
        setItems(data);
        setTotalPages(total_pages);
      } catch (error) {
        alert(error);
      }
    },
    [currentPage]
  );

  return (
    <DataContext.Provider
      value={{ getDataFromApi, items, currentPage, setCurrentPage, totalPages }}
    >
      {children}
    </DataContext.Provider>
  );
};

import { ChangeEvent, useEffect, useState } from "react";
import { ListWithData } from "../components/ListWithData/ListWithData";
import { SearchBar } from "../components/SearchBar";
import { useDataFromApi } from "../hooks/useDataFromApi";
import { Pagination, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

export type DataType = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value?: string;
};

export const MainPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const pageFromUrl = query.get("page");
  const idFromUrl = query.get("id");

  console.log("pageFromUrl", pageFromUrl);
  console.log("idFromUrl", idFromUrl);
  const { getDataFromApi, items, totalPages, currentPage, setCurrentPage } =
    useDataFromApi();
  const [localCurrentPage, setLocalCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLocalCurrentPage(currentPage);
    getDataFromApi();
  }, [currentPage, getDataFromApi]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setLocalCurrentPage(value);
    setCurrentPage(value);
    navigate(`/?page=${value}`);
  };

  return (
    <Stack className="App-header" spacing={3}>
      <SearchBar onSearch={getDataFromApi} page={localCurrentPage} />
      <ListWithData data={items} />
      <Pagination
        count={totalPages}
        variant="outlined"
        color="primary"
        disabled={!Array.isArray(items)}
        onChange={handleChange}
        page={localCurrentPage}
      />
    </Stack>
  );
};

import { ChangeEvent, useEffect, useState } from "react";
import { ListWithData } from "../components/ListWithData/ListWithData";
import { SearchBar } from "../components/SearchBar";
import { useDataFromApi } from "../hooks/useDataFromApi";
import { Pagination, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

export const MainPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const pageFromUrl = query.get("page");
  const idFromUrl = query.get("id");

  const { getDataFromApi, items, totalPages, currentPage, setCurrentPage } =
    useDataFromApi();
  const [localCurrentPage, setLocalCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (pageFromUrl) {
      setCurrentPage(+pageFromUrl);
      getDataFromApi();
    }
  }, []);

  useEffect(() => {
    if (idFromUrl) {
      pageFromUrl && setCurrentPage(+pageFromUrl);
      getDataFromApi(+idFromUrl);
    }
  }, []);

  useEffect(() => {
    if (!idFromUrl || !pageFromUrl) {
      setLocalCurrentPage(currentPage);
      getDataFromApi();
    }
  }, [currentPage, getDataFromApi, idFromUrl, pageFromUrl]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setLocalCurrentPage(value);
    setCurrentPage(value);
    navigate(`/?page=${value}`);
  };

  return (
    <Stack className="App-header" spacing={3}>
      <SearchBar
        onSearch={getDataFromApi}
        page={localCurrentPage}
        searchId={idFromUrl ? +idFromUrl : undefined}
      />
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

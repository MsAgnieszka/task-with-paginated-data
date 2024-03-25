import { Pagination, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListWithData } from "../components/ListWithData/ListWithData";
import { SearchBar } from "../components/SearchBar";
import { useDataContext } from "../contexts/DataContext";

const useQuery = () => new URLSearchParams(useLocation().search);

export const MainPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const pageFromUrl = query.get("page");
  const idFromUrl = query.get("id");

  const { currentPage, getDataFromApi, items, setCurrentPage, totalPages } =
    useDataContext();

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
        page={pageFromUrl ? +pageFromUrl : localCurrentPage}
        searchId={idFromUrl ? +idFromUrl : undefined}
      />
      <ListWithData />
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

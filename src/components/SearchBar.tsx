import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";

type SearchBarProps = {
  page?: number;
  searchId?: number;
};

export const SearchBar = ({ page, searchId }: SearchBarProps) => {
  const navigate = useNavigate();
  const { currentPage, getDataFromApi } = useDataContext();
  const [inputContent, setInputContent] = useState<string>(
    searchId ? `${searchId}` : ""
  );

  const handleSearch = useCallback(
    () => getDataFromApi(+inputContent),
    [inputContent, getDataFromApi]
  );

  const handleClear = useCallback(() => {
    setInputContent("");
    getDataFromApi().then(() => navigate(`/?page=${page}`));
  }, [navigate, getDataFromApi, page]);

  const changeHandler = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputContent(value);
  };

  return (
    <Box
      className="search-container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TextField
        type="number"
        size="small"
        placeholder="Type id (numbers only)"
        name="searchInput"
        value={inputContent}
        variant="outlined"
        onChange={changeHandler}
        style={{ width: 220 }}
      />
      <>
        <Link
          to={
            inputContent
              ? `/?page=${currentPage}&id=${inputContent}`
              : `/?page=${page}`
          }
        >
          <Button
            onClick={handleSearch}
            size="medium"
            style={btnStyle}
            variant="contained"
            disableElevation
          >
            Search
          </Button>
          <Button
            onClick={handleClear}
            size="medium"
            style={btnStyle}
            variant="outlined"
          >
            Clear
          </Button>
        </Link>
      </>
    </Box>
  );
};

const btnStyle = {
  marginLeft: 8,
  color: "black",
};

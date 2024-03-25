import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataFromApi } from "../hooks/useDataFromApi";

type SearchBarProps = {
  onSearch: (id?: number) => Promise<void>;
  page?: number;
  searchId?: number;
};

export const SearchBar = ({ onSearch, page, searchId }: SearchBarProps) => {
  const navigate = useNavigate();
  const { currentPage } = useDataFromApi();
  const [inputContent, setInputContent] = useState<string>(
    searchId ? `${searchId}` : ""
  );

  const handleSearch = useCallback(
    () => onSearch(+inputContent),
    [inputContent, onSearch]
  );

  const handleClear = useCallback(() => {
    setInputContent("");
    onSearch().then(() => navigate(`/?page=${page}`));
  }, [navigate, onSearch, page]);

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
      </>{" "}
    </Box>
  );
};

const btnStyle = {
  marginLeft: 8,
  color: "black",
};

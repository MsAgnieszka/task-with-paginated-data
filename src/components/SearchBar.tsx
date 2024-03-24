import { Button, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataFromApi } from "../hooks/useDataFromApi";

type SearchBarProps = {
  onSearch: (id?: number) => Promise<void>;
  page?: number;
};

export const SearchBar = ({ onSearch, page }: SearchBarProps) => {
  const navigate = useNavigate();
  const { currentPage } = useDataFromApi();
  const [inputContent, setInputContent] = useState<string>("");

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
    <div
      className="search-container"
      style={{ flexDirection: "row", height: 40 }}
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
      <Link
        to={
          inputContent
            ? `/?page=${currentPage}&id=${inputContent}`
            : `/?page=${page}`
        }
      >
        <Button
          onClick={handleSearch}
          size="small"
          style={btnStyle}
          variant="contained"
        >
          Search
        </Button>
        <Button
          onClick={handleClear}
          size="small"
          style={btnStyle}
          variant="outlined"
        >
          Clear
        </Button>
      </Link>
    </div>
  );
};

const btnStyle = {
  marginLeft: 8,
  color: "black",
  height: "100%",
  paddingInline: 8,
};

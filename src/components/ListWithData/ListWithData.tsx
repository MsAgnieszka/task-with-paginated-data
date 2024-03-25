import { useDataContext } from "../../contexts/DataContext";
import { ListBody } from "./ListBody";
import { ListHeader } from "./ListHeader";

export const ListWithData = () => {
  const { items } = useDataContext();
  return (
    <div className="displayDataContainer" style={{ fontSize: 24 }}>
      {!!items ? (
        <table>
          <ListHeader />
          <ListBody />
        </table>
      ) : (
        <text>No results</text>
      )}
    </div>
  );
};

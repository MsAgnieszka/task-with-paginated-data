import { ListWithDataProps } from "../../utils/types";
import { ListBody } from "./ListBody";
import { ListHeader } from "./ListHeader";

export const ListWithData = ({ data }: ListWithDataProps) => {
  return (
    <div className="displayDataContainer" style={{ fontSize: 24 }}>
      {data ? (
        <table>
          <ListHeader />
          <ListBody data={data} />
        </table>
      ) : (
        <text>No results</text>
      )}
    </div>
  );
};

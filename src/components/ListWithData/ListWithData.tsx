import { DataType } from "../../screens/MainPage";
import { ListBody } from "./ListBody";
import { ListHeader } from "./ListHeader";

type ListWithDataProps = {
  data: DataType | DataType[];
};

export const ListWithData = ({ data }: ListWithDataProps) => {
  return (
    <div className="displayDataContainer">
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

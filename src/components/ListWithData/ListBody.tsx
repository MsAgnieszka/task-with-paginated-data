import { DataType } from "../../screens/MainPage";
import { ListItem } from "./ListItem";

type ListBodyProps = {
  data: DataType | DataType[];
};

export const ListBody = ({ data }: ListBodyProps) => {
  console.log(data);

  return (
    <tbody>
      {Array.isArray(data) ? (
        data.map((data, i) => (
          <ListItem key={`${data.id}-${data.name}-${i}`} data={data} />
        ))
      ) : (
        <ListItem data={data} />
      )}
    </tbody>
  );
};

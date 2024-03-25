import { ListWithDataProps } from "../../utils/types";
import { ListItem } from "./ListItem";

export const ListBody = ({ data }: ListWithDataProps) => {
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

import { useDataContext } from "../../contexts/DataContext";
import { ListItem } from "./ListItem";

export const ListBody = () => {
  const { items } = useDataContext();
  return (
    <tbody>
      {Array.isArray(items) ? (
        items.map((item, i) => (
          <ListItem key={`${item.id}-${item.name}-${i}`} item={item} />
        ))
      ) : (
        <ListItem item={items} />
      )}
    </tbody>
  );
};

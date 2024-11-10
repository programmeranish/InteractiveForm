import { Droppable } from "react-beautiful-dnd";
import CustomForm from "./CustomForm/CustomForm";
// Destination List Component
export default function DestinationList({ items }) {
  return (
    <Droppable droppableId="destination">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-1/2"
          style={{
            padding: "10px",
            backgroundColor: "#000000",
            border: "1px solid #ffffff",
            minHeight: "150px",
          }}
        >
          <h4 className="text-gray-400">Destination List</h4>
          <CustomForm dropedItems={items} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

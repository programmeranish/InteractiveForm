import { Droppable } from "react-beautiful-dnd";
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
          <h4>Destination List</h4>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "8px",
                margin: "4px 0",
                backgroundColor: "#0F0F0F",
                borderRadius: "4px",
              }}
            >
              {item.content}
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

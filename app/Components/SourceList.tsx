import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CustomFieldsType } from "./Dashboard";

// Source List Component
type PropsType = {
  items: CustomFieldsType[];
};
export default function SourceList({ items }: PropsType) {
  return (
    <Droppable droppableId="source">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-1/2"
          style={{
            padding: "10px",
            backgroundColor: "#000000",
            minHeight: "150px",
            marginBottom: "20px",
          }}
        >
          <h4 className="text-gray-400">Drag the fields</h4>

          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: "8px",
                    margin: "4px 0",
                    backgroundColor: "#0A0A0A",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    ...provided.draggableProps.style,
                  }}
                >
                  {item.field_label}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

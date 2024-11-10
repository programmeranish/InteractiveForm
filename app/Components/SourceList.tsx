import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Source List Component
export default function SourceList({ items }) {
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
          <h4>Source List</h4>
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
                  {item.content}
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

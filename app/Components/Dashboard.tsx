"use client";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import SourceList from "./SourceList";
import DestinationList from "./DestinationList";

type InitialItemsType = {
  id: string;
  content: string;
  pfield_type: string;
};
const initialItems: InitialItemsType[] = [
  { id: "text-input", pfield_type: "text", content: "Text Input" },
  { id: "select-input", pfield_type: "select", content: "Select Input" },
];

function App() {
  const [sourceItems, setSourceItems] = useState(initialItems);
  const [destinationItems, setDestinationItems] = useState<InitialItemsType[]>(
    []
  );

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // Drop outside the list
    if (!destination) return;

    // Dragging from source to destination
    if (
      source.droppableId === "source" &&
      destination.droppableId === "destination"
    ) {
      const newSourceItems = Array.from(sourceItems);
      const [movedItem] = newSourceItems.splice(source.index, 1);

      // setSourceItems(newSourceItems);
      setDestinationItems([
        ...destinationItems,
        { ...movedItem, id: `${movedItem.id}-${new Date().toString()}` },
      ]);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex gap-8 ">
        <SourceList items={sourceItems} />
        <DestinationList items={destinationItems} />
      </div>
    </DragDropContext>
  );
}

export default App;

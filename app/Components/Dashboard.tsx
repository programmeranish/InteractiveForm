"use client";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import SourceList from "./SourceList";
import DestinationList from "./DestinationList";

export type CustomFieldsType = {
  id: string;
  pfield_type: string;
  field_label: string;
  field_slug: string;
};
const initialItems: CustomFieldsType[] = [
  {
    id: "text-input",
    pfield_type: "text",
    field_label: "Text Input",
    field_slug: "text",
  },
  {
    id: "select-input",
    pfield_type: "select",
    field_label: "Select Input",
    field_slug: "select",
  },
];

function App() {
  const [sourceItems, setSourceItems] = useState(initialItems);
  const [destinationItems, setDestinationItems] = useState<CustomFieldsType[]>(
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
        {
          ...movedItem,
          id: `${movedItem.id}-${new Date().toString()}`,
          field_slug: `${movedItem.field_slug}-${destinationItems.length}`,
        },
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

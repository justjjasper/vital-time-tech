'use client'
import Image from 'next/image'
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Content from '../components/Content';
import { dummyData as initialDummyData } from '../database/dummyData';

export default function Home() {
  const [dummyData, setDummyData] = useState(initialDummyData);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleOnDragStart = (start) => {
    const { source } = start;
    setDraggedIndex(source.index);
  };

  const handleOnDragEnd = (result) => {
    setDraggedIndex(null);
    if (!result.destination) return;

    const items = Array.from(dummyData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDummyData(items);
  };

  return (
    <main className="flex flex-col p-24">
      <section className="z-10 w-full flex justify-center">
        <div className="contentContainer border-black border-2 w-[55%]">
          <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="contents">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {dummyData.map((content, index) => (
                    <Draggable key={content.id} draggableId={content.id} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style
                          }}
                          className={`${snapshot.isDragging ? 'flex justify-center' : ''}`}
                        >
                          {snapshot.isDragging ? (
                            <div className='flex w-[288px] h-[75px] border-[1.5px] border-gray bg-white items-center px-5 rounded-md shadow-lg'>
                              <Image
                                src={content.image} // Use the image of the content being dragged
                                alt={content.title}
                                width={45}
                                height={45}
                                className='mr-2'
                              />
                              <p className='font-semibold text-[17px]'>{content.title}</p>
                              {/* Conditionally render blue line */}
                              {draggedIndex === index && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'blue',
                                    zIndex: -1,
                                    left: '0',
                                    transform: 'translateY(-50%)',
                                  }}
                                />
                              )}
                            </div>
                          ) : (
                            <Content
                              image={content.image}
                              title={content.title}
                              location={content.location}
                            />
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    </main>
  );
}

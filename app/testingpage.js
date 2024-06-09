'use client'
import { useState } from 'react';
import Image from 'next/image';
import Content from './Content';
import { dummyData as initialDummyData } from '../data/dummyData';

export default function ContentList() {
  const [dummyData, setDummyData] = useState(initialDummyData);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
    setDraggedItem(dummyData[index]);
  };

  const handleDragOver = (index) => {
    setHoveredIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedItem) {
      const items = [...dummyData];
      items.splice(draggedIndex, 1);
      items.splice(index, 0, draggedItem);

      setDummyData(items);
      setDraggedItem(null);
      setDraggedIndex(null);
      setHoveredIndex(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  return (
    <section className="z-10 w-full flex justify-center pb-10">
      <div className="contentContainer w-[55%] rounded-lg border-2 border-black shadow-2xl overflow-hidden">
        <ul>
          {dummyData.map((content, index) => (
            <li
              key={content.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(index);
              }}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`relative ${draggedIndex === index ? 'opacity-50' : ''}`}
            >
              <Content
                image={content.image}
                title={content.title}
                location={content.location}
              />
              {hoveredIndex === index && draggedIndex !== index && (
                <div
                  className="absolute top-0 left-0 w-full h-[2px] bg-[#1E9BF0]"
                  style={{ transform: 'translateY(-50%)' }}
                ></div>
              )}
            </li>
          ))}
        </ul>
        {draggedItem && (
          <div className='fixed pointer-events-none'>
            <div className='flex w-[288px] h-[75px] border-[1.5px] border-gray bg-white items-center px-5 rounded-md shadow-lg'>
              <Image
                src={draggedItem.image}
                alt={draggedItem.title}
                width={45}
                height={45}
                className='mr-2'
              />
              <p className='font-semibold text-[17px]'>{draggedItem.title}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

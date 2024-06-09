'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Content from './Content';
import { dummyData as initialDummyData } from '../data/dummyData';

export default function ContentList() {
  const [dummyData, setDummyData] = useState(initialDummyData);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dragImageRef = useRef(null);

  useEffect(() => {
    dummyData.forEach((item) => {
      const img = document.createElement('img');
      img.src = item.image;
    });
  }, [dummyData]);

  const handleDragStart = (index, event) => {
    setDraggedIndex(index);
    setDraggedItem(dummyData[index]);

    const dragImage = document.createElement('div');
    dragImage.style.width = '288px';
    dragImage.style.height = '75px';
    dragImage.style.display = 'flex';
    dragImage.style.alignItems = 'center';
    dragImage.style.backgroundColor = 'white';
    dragImage.style.border = '1.5px solid gray';
    dragImage.style.padding = '5px';
    dragImage.style.borderRadius = '4px';
    dragImage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    const img = document.createElement('img');
    img.src = dummyData[index].image;
    img.width = 45;
    img.height = 45;
    img.style.marginRight = '10px';
    dragImage.appendChild(img);

    const text = document.createElement('p');
    text.innerText = dummyData[index].title;
    text.style.fontWeight = 'bold';
    text.style.fontSize = '17px';
    dragImage.appendChild(text);

    document.body.appendChild(dragImage);
    dragImageRef.current = dragImage;

    event.dataTransfer.setDragImage(dragImage, 0, 0);
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
    if (dragImageRef.current) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }
  };

  return (
    <section className="z-10 w-full flex justify-center pb-10 px-5">
      <div className="contentContainer lg:w-[55%] rounded-lg border-1 border-gray-500 shadow-2xl overflow-hidden">
        <ul>
          {dummyData.map((content, index) => (
            <li
              key={content.id}
              draggable
              onDragStart={(e) => handleDragStart(index, e)}
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
      </div>
    </section>
  );
}

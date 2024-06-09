'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Content from './Content';
import { handleDragEnd, handleDragOver, handleDragStart, handleDrop } from './helperFunctions';

export default function ContentList({ items }) {
  const [contentData, setContentData] = useState(items || []);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dragImageRef = useRef(null);

  // Preload images
  useEffect(() => {
    contentData.forEach((item) => {
      const img = document.createElement('img');
      img.src = item.image;
    });
  }, [contentData]);

  return (
    <section className="contentSection z-10 w-full flex justify-center pb-10 px-5">
      <div className="contentContainer lg:w-[55%] rounded-lg border-1 border-gray-500 shadow-2xl overflow-hidden">
        <ul>
          {contentData.map((content, index) => (
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

'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Content from './Content';
import { handleDragOver, handleDragStart, handleDrop } from './helperFunctions';

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

  const handleDragEnd = async () => {
    setDraggedItem(null);
    setDraggedIndex(null);
    setHoveredIndex(null);
    if (dragImageRef.current) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }

    try {
      const response = await fetch('http://ec2-34-232-66-148.compute-1.amazonaws.com:3001/items', {
        method: 'PUT',
        body: JSON.stringify(contentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update items');
      }
      const updatedItems = await response.json();
      setContentData(updatedItems); // Update the state with the new order
      console.log('Items updated successfully');
    } catch (error) {
      console.error('Error updating items:', error);
    }
  };

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

'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Content from './Content';

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

  const handleDragStart = (index, event) => {
    setDraggedIndex(index);
    setDraggedItem(contentData[index]);

    const dragImage = document.createElement('div');
    dragImage.style.width = '288px';
    dragImage.style.height = '75px';
    dragImage.style.display = 'flex';
    dragImage.style.alignItems = 'center';
    dragImage.style.backgroundColor = 'white';
    dragImage.style.border = '1.5px solid gray';
    dragImage.style.padding = '10px';
    dragImage.style.borderRadius = '4px';
    dragImage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    const img = document.createElement('img');
    img.src = contentData[index].image;
    img.width = 45;
    img.height = 45;
    img.style.marginRight = '10px';
    dragImage.appendChild(img);

    const text = document.createElement('p');
    text.innerText = contentData[index].title;
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
      const updatedItems = [...contentData];
      updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(index, 0, draggedItem);

      setContentData(updatedItems);
      setDraggedItem(null);
      setDraggedIndex(null);
      setHoveredIndex(null);
    }
  };

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

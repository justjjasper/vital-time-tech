export const handleDragStart = (index, event) => {
  setDraggedIndex(index);
  setDraggedItem(contentData[index]);

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

export const handleDragOver = (index) => {
  setHoveredIndex(index);
};

export const handleDrop = (index) => {
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
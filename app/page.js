'use client'
import Image from 'next/image';
import ContentList from '../components/ContentList';
import Header from '../components/Header';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Content from '../components/Content';
import { dummyData as initialDummyData } from '../data/dummyData';

export default function Home() {
  return (
    <main className="flex flex-col bg-gradient-to-br from-white via-blue-100 to-blue-200">
      <Header/>
      <ContentList/>
    </main>
  );
}

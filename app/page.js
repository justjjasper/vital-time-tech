import Image from 'next/image';
import ContentList from '../components/ContentList';
import Header from '../components/Header';
import Content from '../components/Content';

export default async function Home() {
  try {
    const data = await fetch('http://127.0.0.1:3001/items');
    const items = await data.json();
    console.log('what are items', items)

    return (
      <main className="flex flex-col bg-gradient-to-br from-white via-blue-100 to-blue-200">
        <Header />
        <ContentList items={items} />
      </main>
    )
  } catch(err) {
    return (
      <div>
        Error Loading Page
      </div>
    )
  }
}

import Image from 'next/image';
import ContentList from '../components/ContentList';
import Header from '../components/Header';
import Content from '../components/Content';

export default async function Home() {
  try {
    const data = await fetch('http://ec2-34-232-66-148.compute-1.amazonaws.com:3001/items');
    const items = await data.json();

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

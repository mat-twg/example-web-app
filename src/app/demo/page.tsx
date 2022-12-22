import Demo from './demo';
import { Entity } from './table';

const getEntityList = async (): Promise<Entity[]> => {
  const res = await fetch('http://localhost:3000/entity/list', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function Page(): Promise<JSX.Element> {
  return <Demo data={await getEntityList()} />;
}

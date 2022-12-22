import Demo from './demo';

const getData = async () => {
  const res = await fetch('http://localhost:3000/entity/list', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function Page() {
  return <Demo data={await getData()} />;
}

import { promises as fs } from 'fs';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.css';

export default async function Page(): Promise<JSX.Element> {
  const fileContents = await fs.readFile(
    join(process.cwd(), 'src', 'README.md'),
    'utf8',
  );

  return (
    <ReactMarkdown className={'markdown p-4 mt-3'} remarkPlugins={[remarkGfm]}>
      {fileContents.toString()}
    </ReactMarkdown>
  );
}

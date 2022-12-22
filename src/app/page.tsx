import { promises as fs } from 'fs';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.css';
import { ReactNode } from 'react';

export default async function Page(): Promise<ReactNode> {
  const fileContents = await fs.readFile(
    join(process.cwd(), 'src', 'README.md'),
    'utf8',
  );

  return (
    <ReactMarkdown className={'markdown p-3 mt-3'} remarkPlugins={[remarkGfm]}>
      {fileContents.toString()}
    </ReactMarkdown>
  );
}

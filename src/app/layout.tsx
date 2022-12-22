import { ReactNode } from 'react';

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/navbar';

export default function Layout({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="min-vh-100 h-100">
      <head>
        <title>Example</title>
      </head>
      <body className="d-flex min-vh-100 text-center text-white bg-dark">
        <div className="d-flex w-75 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <div>
              <h3 className="float-md-start mb-0">Example</h3>
            </div>
            <Navbar />
          </header>
          <main className={'d-block'}>{children}</main>
          <footer className="mt-auto text-white-50 text-center">
            <p>
              Cover template for{' '}
              <a href="https://getbootstrap.com/" className="text-white">
                Bootstrap
              </a>
              , by{' '}
              <a href="https://twitter.com/mdo" className="text-white">
                @mdo
              </a>
              .
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}

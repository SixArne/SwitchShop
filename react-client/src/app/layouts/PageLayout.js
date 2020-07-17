import { default as React } from 'react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './PageLayout.scss';

const PageLayout = ({children}) => {
  return (
    <div className="page">
      <Header />
      <main className="page-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
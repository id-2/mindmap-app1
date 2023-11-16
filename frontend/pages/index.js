import React from 'react';
import Head from 'next/head';
import Mindmap from '../components/Mindmap';
import Sidebar from '../components/Sidebar';
import { useUser } from '../lib/hooks';

const Home = () => {
  const user = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Webmind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Mindmap />
        <Sidebar />
      </main>

      <footer>
        <p>© 2023 Webmind Applications and Services, Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
import React from 'react';
import 'upkit/dist/style.min.css';
import { SideNav, LayoutSidebar } from 'upkit';

import menus from './menus';
import TopBar from '../../components/TopBar';

function Home() {
  return (
    <div>
      <LayoutSidebar
        sidebar={<SideNav items={menus} verticalAlign="top" />}
        content={
          (
            <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
              <div className="w-full md:w-3/4 pl-5 pb-5">
                <TopBar />
              </div>
              <div className="w-full md:w-1/4 h-full shadow-lg bg-gray-100 border-r-2 border-white pl-5">
                Bagian keranjang aplikasi
              </div>
            </div>
          )
        }
        sidebarSize={80}
      />
    </div>
  );
}

export default Home;

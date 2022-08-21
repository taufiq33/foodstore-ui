import React from 'react';
import 'upkit/dist/style.min.css';
import { SideNav, LayoutSidebar } from 'upkit';

import menus from './menus';

function Home() {
  return (
    <div>
      <LayoutSidebar
        sidebar={<SideNav items={menus} verticalAlign="top" />}
        content={<div><h1>Haloo</h1></div>}
        sidebarSize={80}
      />
    </div>
  );
}

export default Home;

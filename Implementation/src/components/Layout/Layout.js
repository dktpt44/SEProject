import { Fragment } from 'react';

import MainNavigation from './MainNavigation';
import Footer from './Footer';

// Layout for the app. consists of header and footer
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer/>
    </Fragment>
  );
};

export default Layout;

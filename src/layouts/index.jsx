import React from 'react';
import Helmet from 'react-helmet';
import '../assets/scss/init.scss';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="page lirawx">
        <Helmet defaultTitle="Blog by Lirawx" />
        {children()}
      </div>
    );
  }
}

export default Layout;

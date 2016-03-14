import React,{Component} from 'react';

import Nav from './layout/Nav';

export default class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (<div>
      <Nav></Nav>

      <div className="container-fluid">
        <h1 className="page-header">Hello World</h1>
      </div>
    </div>);
  }
}

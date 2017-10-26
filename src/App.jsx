import React, {Component} from 'react';

class App extends Component {
  render() {
    var obj = ["de","cd"].map(id =>{
      return <h1>{id}</h1>
    })
    return (
    <div>
        {obj}
        <h1>Hello React :)</h1>
    </div>
    );
  }
}
export default App;

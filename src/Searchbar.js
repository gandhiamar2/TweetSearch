import React, {Component} from 'react';
import styles from '../styles/style.scss'

class Searchbar extends Component{

  constructor(props){
    super();
    this.state = {searchValue:"" }
  }

  searchValueChange = (event)=>{
    this.setState({searchValue:event.target.value})
  }

  componentWillReceiveProps(nextProps){  //avoid when self rendering
    console.log(nextProps);
    this.setState({searchValue: nextProps.searchValue})
  }

  render(){
    return(
    <div className="searchBox">
      <input className="searchField" type="text" value = {this.state.searchValue} onChange = {this.searchValueChange} />
      <button className="searchButton" onClick={()=>this.props.searchClick(this.state.searchValue)}> Search Tweets </button>
    </div>
    );
  }
}

export default Searchbar

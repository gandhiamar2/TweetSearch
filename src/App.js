import React, {Component} from 'react';
import Searchbar from './Searchbar.js'
import Tweetlist from './Tweetlist.js'
import styles from '../styles/style.scss'
import axios from 'axios';
const reserved = '#';
const reservedValue = '%23';


class App extends Component {

  searchValue;
  constructor(props){
    super();
    this.state = {tweets:[]}
  }

  componentDidMount(){
      this.serviceCall();
  }

  serviceCall = (query = "")=>{
    if(query.includes(reserved))
      query = query.replace(/#/g,reservedValue);

    axios.get(`${window.location.origin}/tweets${query}`)
      .then(function (response) {
        this.setState({tweets: response.data})
        console.log(response)
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }

  searchClick = (value)=>{
    this.searchValue = value
    {(value=="")?this.serviceCall():this.serviceCall(`?searchkey=${value}`)}
  }

  render() {
    return (
    <div className="app">
      <Searchbar searchClick = {this.searchClick} searchValue = {this.searchValue}/>
      {(this.state.tweets.length>0)?( <Tweetlist tweets = {this.state.tweets} searchClick = {this.searchClick} />): (<div className="noData"> No Data Found </div>)}
    </div>
    );
  }
}

export default App;

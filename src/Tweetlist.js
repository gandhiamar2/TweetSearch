import React, {Component} from 'react';


class Tweetlist extends Component{

  tweetLoader = ()=>{
    return this.props.tweets.map((item, id)=>{
      return   <li className = "listItem"key={id}> {this.tweetClickability(item)}</li>
    })
  }

  tweetClickability = (item)=>{
    var returnElement=[]
    if(item.content.includes('@') || item.content.includes('#')){
      var sl = item.content;
      while(sl.includes('@') || sl.includes('#')){
        let index2 = sl.indexOf('@')
        let index3 = sl.indexOf('#');
        let index = (index3>0 && index3 < index2)? index3 : (index2>0)?index2:index3
        let slice = sl.slice(0,index);
        let sli = sl.slice(index);   // take care of comma test #
        let clickableText = sli.split(" ")[0];
        sl = sli.slice(clickableText.length)
        returnElement.push(<text key={returnElement.length+1}>{slice}</text>)
        returnElement.push(<text className="textClickable" key={returnElement.length+1} onClick={()=>this.props.searchClick(`${clickableText}`)}>{clickableText}</text>)
      }
      returnElement.push(<text key={returnElement.length+1}>{sl}</text>)
    }else{
      returnElement.push(<text key={returnElement.length+1}>{item.content}</text>)
    }
    returnElement.push(<text key={returnElement.length+1} >  -{item.user}</text>)
    returnElement.push(<text key={returnElement.length+1}>{"   "+ item.creation+ "   "}</text>)

    return returnElement
  }
  render(){
    return(
      <div style={{marginTop:70, minHeight:1000}}>
        <ul className="listGroup">
          {this.tweetLoader()}
        </ul>
      </div>
    );
  }
}

export default Tweetlist

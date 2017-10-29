var fs = require('fs');
import path from 'path';
var exec = require('child_process').exec;
var execsync = require("child_process").execSync;

const getAll = (req,res)=>{
  var file = fs.readFileSync(path.join(__dirname,'../resources/assignment_tweet.txt'),'utf8');
  var fileBreaked = file.split(/\n(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
  var searchKey = req.query.searchkey;
  var tweetJson = {}, selectedTweetJson = {}
  var array = [];
  // console.log(searchkey)
  fileBreaked.map((item,id)=>{
    if(id>0){
      if(id ==1 || id%2 ==1){
          tweetJson[id] = {};
          tweetJson[id]["creation"] = item
      }
      else{
          let arrayOfStrings = item.trim().split(" ")
          tweetJson[id-1]["user"] = arrayOfStrings.pop();
          tweetJson[id-1]["content"] = item.trim().slice(0, item.trim().length - tweetJson[id-1]["user"].length)
          if(searchKey !== undefined){
            if(tweetJson[id-1]["user"].toLowerCase().includes(searchKey.toLowerCase()) || tweetJson[id-1]["content"].toLowerCase().includes(searchKey.toLowerCase())){
              selectedTweetJson[id-1] = tweetJson[id-1]

              array.push(tweetJson[id-1])

            }
          }
          else{
            array.push(tweetJson[id-1])
          }
      }
    }
  })


  const datePriorityChecker = (chk1, chk2)=>{
      if(chk1 > chk2){
        return -1
      }else if(chk1 < chk2){
        return 1
      }else {
        return 0;
      }
  }

  // adjust for escape chars and implement date and test
  if(searchKey === undefined){
    array.sort((a,b)=>{
      return datePriorityChecker(new Date(a.creation),new Date(b.creation))
    })
    res.send(array)
  }
  else{
    var searchKey2 = searchKey.replace(/([.,*+?^=!:${}()|\[\]\/\\])/g, "\\$&");
    array.sort((a,b)=>{
      if(a.user.toLowerCase() == searchKey.toLowerCase() || b.user.toLowerCase() == searchKey.toLowerCase()){ // username match takes priority 1
        if(a.user.toLowerCase() == b.user.toLowerCase()){
          return datePriorityChecker(new Date(a.creation),new Date(b.creation))  //date priority 0
        }
        else if(b.user.toLowerCase() == searchKey.toLowerCase()){
          return 1;
        }
        else {
          return -1;
        }
      }
      else if(a.content.match(`\\b${searchKey2}\\b`) || b.content.match(`\\b${searchKey2}\\b`)){ // content exact word and case takes priority 4
        console.log("here4")
        if(a.content.match(`\\b${searchKey2}\\b`) && b.content.match(`\\b${searchKey2}\\b`)){
          return datePriorityChecker(new Date(a.creation),new Date(b.creation)) //+ recent time takes priority 3
        }
        else if(b.content.match(`\\b${searchKey2}\\b`)){
          return 1;
        }
        else {
          return -1;
        }
      }
      else if(a.content.toLowerCase().match(`\\b${searchKey2.toLowerCase()}\\b`) || b.content.toLowerCase().match(`\\b${searchKey2.toLowerCase()}\\b`)){ // content exact word and ignore case  takes priority 6
        console.log("here6")
        if(a.content.toLowerCase().match(`\\b${searchKey2.toLowerCase()}\\b`) && b.content.toLowerCase().match(`\\b${searchKey2.toLowerCase()}\\b`)){
            return datePriorityChecker(new Date(a.creation),new Date(b.creation)) //+ recent time takes priority 5
        }
        else if(b.content.toLowerCase().match(`\\b${searchKey2.toLowerCase()}\\b`)){
          return 1;
        }
        else {
          return -1;
        }
      }
      else if (a.content.includes(searchKey) || b.content.includes(searchKey)){ // content word include and match case  takes priority 8
        console.log("here8")
        if(a.content.includes(searchKey) && b.content.includes(searchKey)){
            return datePriorityChecker(new Date(a.creation),new Date(b.creation)) //+ recent time takes priority 7
        }
        else if(b.content.includes(searchKey.toLowerCase())){
          return 1;
        }
        else {
          return -1;
        }
      }
      else if (a.content.toLowerCase().includes(searchKey.toLowerCase()) || b.content.toLowerCase().includes(searchKey.toLowerCase())){ // content word include and ignore case  takes priority 10
        console.log("here10")
        if(a.content.toLowerCase().includes(searchKey.toLowerCase()) && b.content.toLowerCase().includes(searchKey.toLowerCase())){
            return datePriorityChecker(new Date(a.creation),new Date(b.creation)) //+ recent time takes priority 9
        }
        else if(b.content.toLowerCase().includes(searchKey.toLowerCase())){
          return 1;
        }
        else {
          return -1;
        }
      }
    })

    console.log("break");
    res.send(array)
  }

}




export default {getAll};

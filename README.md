TweetSearch
=====================

Install the dependencies and start the server.
npm install

Build Webpack and start Server(port 4000) (User mode)
npm run start:webpackprodrun && npm run start

Build Webpack and start Server(port 4000) (Dev mode)
Terminal1: npm start:webpack , Terminal2: npm run start

application url: http://localhost:4000/
====================
tweetsfile: resources/assignment_tweet.txt
React components: src/
Web service: services/tweetservice.js (end point: /tweets)

====================
web service call will trigger the sync read of tweets file and it will be parsed through breaking tweets with delimiter (/n YYYY-MM-DD HH:MM:SS) and tweets are stored in json format with split user, content and date.
with search word all relevant tweets will be appended to array further passed prioritizing algorithm.
The prioritizing algorithm will sort relevant tweets array giving highest priority to username, exact word and case, exact word and ignore case, include word and match case , include word and ignore case together with latest created date.
escape character handling is also taken care of

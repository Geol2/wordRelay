const express = require('express')
const app = express()
const port = 3000

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.ejs', {title: 'EXPRESS TEMPLATE ENGINE'});
})

app.get('/getApi', (req, res) => {
    
    console.log(req.query.q);
    
    let url = "https://stdict.korean.go.kr/api/search.do?" + 
      "type_search=search" + 
      "&key=BF798F78613F68086AAE9952E915A59C" +
      "&q=" + req.query.q +
      "&req_type=json";

    let decodeURL = decodeURI(url);
    console.log(decodeURL);
    
    fetch(decodeURL)
      .then(response => {
          let json = response.json();
          return json;
      })
      .then(data => {
        console.log(data);
        if( data.channel.item.length > 0 ) {
          return res.send({is : true});
        }

        return res.send({is : false});
      })
      .catch(error => {
        console.log("error : " + error);
        res.send({is : false});
      });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
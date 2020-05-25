var express = require('express');
var router = express.Router();

const path = './.data/secure-connect-freetier-database.zip';
const { Client } = require('cassandra-driver');
const client = new Client({
	cloud: { secureConnectBundle : path },
	credentials : { username : process.env.ASTRAUSERNAME, password : process.env.ASTRAPASSWORD }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Better Botz' });
});

router.get('/datareport', function (req, res) {
  getMoreData().then(function(data){
    res.render('datareport', { data } );
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

router.get('/data', function (req, res) {
  getMoreData().then(function(data){
    res.send(data);
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

async function getMoreData(){
  const result = await client.execute('SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM betterbotz.orders');
  return result.rows;
}

module.exports = router;

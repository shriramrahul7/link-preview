const express = require('express');
const app = express();
const cheerio = require('cheerio');
const { default: fetch } = require('node-fetch');

const server = require('http').Server(app);

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/scrape',  async (req, res) => {
    const orgURL = req.body.url.toString() 

    response = await fetch(orgURL);
    respHTML = await response.text()
        
    resObj = {};
    $ = cheerio.load(respHTML);
    
    const ogTitle = $('meta[property="og:title"]').attr('content') || $('head title').text() || $('meta[name="title"]').attr('content')
    const ogURL = $('meta[property="og:url"]').attr('content')
    const ogSitename = $('meta[property="og:site_name"]').attr('content')
    const ogDesc = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
    const ogImg = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content')
    const ogKeywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content')
    // const ogType

    resObj.title = ogTitle;
    resObj.url = ogURL;
    resObj.sitename = ogSitename;
    resObj.desc = ogDesc;
    resObj.orgURL = orgURL
    resObj.img = ogImg;
    resObj.keywords = ogKeywords;

    res.end(JSON.stringify(resObj));

})

server.listen('3000', () => console.log('server is running on port: http://localhost:3000'))    


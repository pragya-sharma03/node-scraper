const fs = require('fs-extra');
const express = require('express');
const fetch = require('node-fetch');
const scraper = require('./scraper');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', (req,res) => {

    res.json({
        message:"Scraping is fun"
    });
     
});



app.get('/collegelist', (req,res) => {
    collegesdata = [];
     var url = 'https://www.shiksha.com/colleges-';
     var i=2;
    (async function main() {
     
         try {

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        while(i<=3){
        await page.goto(`${url}${i}`);
//        await page.waitForSelector('div.ctp-SrpDiv');
//        await page.waitForSelector('div.ctpSrp-tuple');
        await page.waitForSelector('div.shadowCard.ctpCard');
//        await page.waitForSelector('p.ctp-cty');
//        await page.waitForSelector('a.fnt-w6');
//        await page.waitForSelector('div.ctp-detail > ul');
//        await page.waitForSelector('div.ctp-detail > span.avail_exams');
        
        const colleges = await page.$$('div.shadowCard.ctpCard');
        for (const college of colleges){

            const collegeobject = {
           
            collegename : await college.$eval('strong.instNamev2', body => body.innerText),
            location : await college.$eval('span.instLoc', body => body.innerText),
            course : await college.$eval('.valueTxt',body => body.innerText),
            exams : await college.$eval('div.exams-flex',body => body.innerText),
           
         }
          console.log(collegeobject);
          
          collegesdata.push(collegeobject);
        }
      
   
          //console.log(colleges.length);
          res.json(collegesdata);
          console.log(collegesdata);
        fs.writeFileSync('./oneseventyseven.txt', JSON.stringify(collegesdata) + '\n');


 await browser.close();
    } catch(e){
        console.log('our error',e);
    }
   
  }

      })();
})


//await page.waitForNavigation({waitUntil: 'load'});
     //   await Promise.all([
       //     button.click(),
         //   page.waitForNavigation()
         // ])



const port = process.env.PORT || 3100;

app.listen(port,() => {
    console.log(`Server is running at port no. ${port}`)
})

//ps -e|grep node
// kill -9 XXXX
//ps -aux | grep nodemon
// net::ERR_NAME_NOT_RESOLVED AT
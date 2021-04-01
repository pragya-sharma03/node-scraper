const cheerio = require('cheerio');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
//const collegeURL = 'https://collegedunia.com/e-search?c=college&query=';
const collegeURL = 'https://collegedunia.com/india-colleges';
const collegepageURL = 'https://collegedunia.com/college/';

function getColleges(){
    colleges = [];
    return fetch(`${collegeURL}`)
     .then((res) => res.text())
      .then(body => {
        const $ = cheerio.load(body);
        $('div.shadowCard.ctpCard').each(function(i,element){
           $collegename = $(element).find('strong.instNamev2').text().trim();
           $rating = $(element).find('div span.ratingTag').text().trim();
           $location = $(element).find('div span.ctpSprite').text().trim();
           $fee = $(element).find('.valueTxt').text().trim();
           college = {
             name : $collegename,
             rating : $rating,
             location : $location,
             fee : $fee
          }
           colleges.push(college);
        })
        
         return colleges;
      })
}

 

module.exports = {
    getColleges
};

//const port = process.env.PORT || 3210 ;
//
//app.listen(port,() => {
//    console.log(`Server is running at port no. ${port}`)
//})
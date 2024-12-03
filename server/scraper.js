const request = require('request')
const cheerio = require('cheerio')
const gemini = require('./gemini');



//sc-rbbb40-1 class name of next page tab

//sc-dln2kl-0 class name for review tab

//sc-1hez2tp-0 



const loadHTML = async (html, reviews ) => {
  let $ = await cheerio.load(html);

  //check for wether the page correct

  const tab = $("p.sc-1hez2tp-0");
  let tab_ind = 0
  let isValidUrl = false
  tab.map(() => {
    if($(tab[tab_ind]).text() == "All Reviews") isValidUrl = true; 
    tab_ind = tab_ind + 1
  })

  if(!isValidUrl) return "invalid"

  const section = $(".sc-1hez2tp-0");

  let i = 0;
  section.map((data) => {
    if (
      !$(section[i]).hasClass("time-stamp") &&
      i > 4 &&
      $(section[i]).parent().attr("href") === undefined &&
      $(section[i]).attr("color") !== "#9C9C9C"
      && $(section[i]).text() !== ""
    ) {
    
      reviews.push($(section[i]).text());
    }
    i = i + 1;
  });
  
   // console.log("completed with reviews : ", reviews);

   //code to check if all reviews are over 
    
   const movers =  $(".sc-rbbb40-1")
    let ind = 0;
    let found = false
    movers.map(() => {
        //console.log($(movers[ind]).find('svg').find('title').text())
        if ($(movers[ind]).find("svg").find("title").text() == "chevron-right") found = true
        ind = ind + 1;
    })
    
    return !found ? "done" : "notDone"
}; 



const scrape = async (req, res) => {
    
    let page = 1;
    let url = req.body?.url;
    const size = req.body?.size
    const reviews = [];
    let isDone = false
    
    
  
    const cb = async (error, responce, html) => {
      if (error) {
        console.log(error);
        res.status(500);
        res.send({
          message: "cannot get data",
        });
      } else {
        console.log("UPDAING THE HTML");
        isDone = await loadHTML(html, reviews);
        page = page + 1
        if (isDone === "invalid") {
             res.status(404);
             res.send({
               message: "invalid url, enter a valid review page url of a restaurent",
             }); 
        }
        else if (reviews.length > size || isDone === "done") {
            
          // gathering summaries for the reviews
          

            console.log("**************************GETTING SUMMARIES************************")
            try {
                const summary = await gemini.run(reviews)
                res.status(200)
                res.send(summary)
            } catch (error) {
              res.status(500);
              res.send({
                message: "internal server error !"
              });  
            }
            
        }
        else {
            console.log(url + page)
            
            request(url + page, cb);
        }
        
      }
    };
  
  if (!size || !url) {
    //console.log("******************DATA MISSING********************")
    //console.log(req.body)
    res.status(500);
    res.send({
      message: "All required fields are not send",
    });
  }
   
  else {
    url = url + "?page="
    request(url + page, cb);
  }

    
   
}

module.exports = {
  scrape,
}




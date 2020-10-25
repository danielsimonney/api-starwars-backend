const express = require("express"),
router = express.Router();
const api = require ('../helpers/api.js')

router.get("/starwars/:type", async (request, response) => {
  let type = request.params.type
  let allTypes = ["species","people","starships","planets","films","vehicles"]
  if(allTypes.includes(type)){
    getAlldataFromType(type).then(res =>{
      response.json(res)
    });
  }else{
    response.send('error type unexistant')
  }
});


router.get("/starwars/wookie/:type", async (request, response) => {
  let type = request.params.type
  let allTypes = ["species","people","starships","planets","films","vehicles"]
  if(allTypes.includes(type)){
    getAllDataFromTypeWookie(type).then(res =>{
      console.log("mmm")
      console.log(res)
      response.json(translate(res))
    });
  }else{
    response.send('error type unexistant')
  }
});

const getAllDataFromTypeWookie=async function(type,data=[],page=1){
  return api.get("/"+type+(page==1?'/?':("/?page="+page+"&"))+"format=wookiee")
  .then(res => {
    console.log("azert")
    var datajsonify=res.data
    if(type=="films"){
      const regex = /whhuanan/gi;
      const regexEscape = /\\rc\\wh/gi
      let response = res.data.replace(regex,null)
      let response2 = response.replace(regexEscape,"\\r\\n")
      let finaleData = JSON.parse(response2);
      return finaleData.rcwochuanaoc
      // return JSON.parse(response2)
    }
    if(typeof(datajsonify)=="string"){
    const regex = /whhuanan/gi;
    let response = res.data.replace(regex,null)
    datajsonify=(JSON.parse(response));
    }
    console.log(datajsonify)
    console.log(typeof(datajsonify))
    if(datajsonify.whwokao != null){
      // console.log("calling next page", datajsonify.rcwochuanaoc)
      datajsonify.rcwochuanaoc.forEach(element => {
        data.push(element)
      });
      if(type=="people"){
        if(page==3){
          return getAllDataFromTypeWookie(type,data,page+2)
        }
        if(page==5){
          return getAllDataFromTypeWookie(type,data,page+3)
        }
      }
        return getAllDataFromTypeWookie(type,data,page+1)
    }else{
      console.log("kkkkkkkkmm")
      datajsonify.rcwochuanaoc.forEach(element => {
        data.push(element)
      });
      // let finaleData = translate(data)
      // console.log(finaleData)
      return data;
      }
    })
  .catch(err => {
    console.log(err);
  });
};



const getAlldataFromType =async function(type,data=[],page=1){
  return api.get("/"+type+(page==1?'':("/?page="+page)))
  .then(res => {
    if(res.data.next != null){
      console.log("calling next page", res.data.next)
      res.data.results.forEach(element => {
        data.push(element)
      });
      return getAlldataFromType(type,data,page+1)
    }else{
      res.data.results.forEach(element => {
        data.push(element)
      });
      console.log(data.length)
      console.log("returning data", data.length)
      let finaleData = replaceUrl(data)
      return finaleData;
      }
    })
  .catch(err => {
    console.log(err);
  });
};

router.get("/starwars/:type/:id", async (request, response) => {
  let type = request.params.type
  let id= request.params.id
  let allTypes = ["species","people","starships","planets","films","vehicles"]
  if(allTypes.includes(type)){
    api.get(`/${type}/${id}`)
    .then(res => {
      response.json(replaceUrl(res.data));
    })
    .catch(err => {
      console.log(err);
    });
  }else{
    response.send('error type unexistant')
  }
});

router.get("/starwars/wookie/:type/:id", async (request, response) => {
  let type = request.params.type
  let id= request.params.id
  let allTypes = ["species","people","starships","planets","films","vehicles"]
  if(allTypes.includes(type)){
    api.get(`/${type}/${id}/?format=wookiee`)
    .then(res => {
      if(type=="films"){
        const regex = /whhuanan/gi;
      const regexEscape = /\\rc\\wh/gi
      let response1 = res.data.replace(regex,null)
      let response2 = response1.replace(regexEscape,"\\r\\n")
      let resp=(JSON.parse(response2));
      response.json(translate(resp))
      }else{
        // console.log(translate(res.data))
        // console.log(JSON.parse(translate(res.data)))
     response.json(translate(res.data))
      }
    })
    .catch(err => {
      console.log(err);
    });
  }else{
    response.send('error type unexistant')
  }
});



function replaceUrl(data){
data=JSON.stringify(data)
const regexUrl = /http:\/\/swapi.dev\/api/gi
let resp = data.replace(regexUrl,'')
return JSON.parse(resp)

}

function translate(data){
  console.log(typeof(data))
  if(typeof(data)!=="string"){
    data=JSON.stringify(data)
  }
  const regexNull = /whhuanan/gi;
  const regexNextEnd = /&wwoorcscraao=ohooooorahwowo\//gi
  const regexFilms = /acaoaoak:\/\/cohraakah.wawoho\/raakah\/wwahanscc\//gi
  const regexVehicle = /acaoaoak:\/\/cohraakah.wawoho\/raakah\/howoacahoaanwoc\//gi
  const regexStarships = /acaoaoak:\/\/cohraakah.wawoho\/raakah\/caorarccacahakc\//gi
  const regexUrl = /"hurcan": "acaoaoak:\/\/cohraakah.wawoho\/raakah\/howoacahoaanwoc\/6\/"/gi
  const regexPlanet =/acaoaoak:\/\/cohraakah.wawoho\/raakah\/akanrawhwoaoc\//gi
  const regexPeople = /acaoaoak:\/\/cohraakah.wawoho\/raakah\/akwoooakanwo\//gi
  const regexSpecies = /acaoaoak:\/\/cohraakah.wawoho\/raakah\/cakwooaahwoc\//gi
  let resp = data.replace(regexNull,null)
  let resp1 = resp.replace(regexFilms,"/films/")
  let resp2= resp1.replace(regexVehicle,"/vehicles/")
  let resp3 = resp2.replace(regexStarships,"/starships/")
  let resp4 = resp3.replace(regexPlanet,"/planets/")
  let resp5 = resp4.replace(regexPeople,"/people/")
  let resp6 = resp5.replace(regexSpecies,"/species/")
  // console.log(resp6)

  return JSON.parse(resp6)
}
module.exports = router;

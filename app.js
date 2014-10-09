'use-strict'; 

const 
    collections = require("./util/collections"), 
    model = require("./model"); 
    
var music = collections
                .makeList("music.json", model.makeGenreFromJSON)
                .loadSync();

console.log(music.values);
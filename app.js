'use-strict'; 

const 
    collections = require("./util/collections"), 
    model = require("./model"),
    view = require("./view"); 
    
var music = collections
                .makeList("music.json", model.makeGenreFromJSON)
                .loadSync();

var menu = view
               .makeMenu("(1) Show Music (2) Add Music (q) Quit", /^[1-2q]$/)
               .onUserInput(function (input) {
                    switch (input) {
                        case '1':
                            showGenres();
                            break;
                        
                        case '2':
                            addMusic()
                            break;
                            
                        case 'q':
                            console.log('Thanks for using Listen Lister, bye bye...');
                            process.exit(1);
                            break;
                    }
                })
                .show();
                
function showGenres() {
    var genres = [];
    for (var i = 0; i < music.values.length; i++) {
        genres.push([i+1, music.values[i].name]);
    }
    view.makeTable(["No.:", "Genre:"]).show(genres);
    view
       .makeMenu("(n) Select a genre (b) back", /^[0-9b]$/)
       .onUserInput(function (input) {
           switch (input) {
               case 'b':
                   menu.show();
                   break;
               default:
                   showGenre(music.values[input-1]);
           }
       })
       .show();
}

function showGenre(genre) {
    console.log(genre.name);
    
    var values = [];
    for (var i = 0; i < genre.musiclength; i++) {
        values.push([genre.music[i].artist, genre.music[i].title]);
    }
    
    view.makeTable(["No.:", "Artist:", "Title:"]).show(values);
    // var list = find(music) music.values.find(function (element, index, array) {
    //   return (element.name === genre) ? true : false;
    // });
}

function addMusic() {
    
}

function find(values, key, value) {
    for (var i = 0; i < values.length; i++) {
        if (values[i][key] === value) {
            return values[i].music;
        }
        return null;
    }
}


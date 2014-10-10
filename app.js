'use-strict'; 

const 
    collections = require("./util/collections"), 
    model = require("./model"),
    view = require("./view"); 
    
var music = collections
                .makeList("music.json", model.makeGenreFromJSON)
                .loadSync();

var menu = view
               .makeMenu("(1) Show Music (2) Add Music (q) Quit", /^[1-2q]{1}$/)
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
       .makeMenu("(#) Select a genre (b) back", /^[0-9b]{1}$/)
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
    for (var i = 0; i < genre.music.length; i++) {
        values.push([i+1, genre.music[i].artist, genre.music[i].title]);
    }
    
    view.makeTable(["No.:", "Artist:", "Title:"]).show(values);
    view
       .makeMenu("(g) Back to genres (m) back to main menu", /^[gm]{1}$/)
       .onUserInput(function (input) {
           switch (input) {
               case 'm':
                   menu.show();
                   break;
                case 'g':
                   showGenres();
                   break;
           }
       })
       .show();
}

function addMusic() {
    
}

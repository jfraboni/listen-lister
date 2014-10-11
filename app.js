'use-strict'; 

const 
    exit = require("./util/exit"),
    collections = require("./util/collections"), 
    model = require("./model"),
    view = require("./view"); 
    
var alphaNumber = /^[A-Za-z0-9\s\'\"\.]+$/;
    
var music = collections
                .makeList("music.json", model.makeGenreFromJSON)
                .loadSync();
                
exit.init({
    exit: {actions: [music.saveSync.bind(music)]},
    sigint: {actions: [music.saveSync.bind(music), process.exit]}
});

var menu = view
               .makeMenu("(1) Show Music (2) Add Music (q) Quit", /^[1-2q]{1}$/)
               .onUserInput(function (input) {
                    switch (input) {
                        case '1':
                            showGenreMenu();
                            break;
                        
                        case '2':
                            addSong();
                            break;
                            
                        case 'q':
                            console.log('Thanks for using Listen Lister, bye bye...');
                            process.exit(0);
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
}

function showGenre(genre) {
    console.log(genre.name + ':');
    
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
                   showGenreMenu();
                   break;
           }
       })
       .show();
}

function addSong() {
    console.log("Add a song:");
    view.makeMultiInputMenu([
        {
            name: "artist", 
            validator: alphaNumber,
            message: 'Enter the name of the Artist',
            required: true
        },
        {
            name: "title", 
            validator: alphaNumber,
            message: 'Enter the title of the song',
            required: true
        }])
        .onUserInput(function (input) {
            selectGenreForSong(model.makeSong(input.artist, input.title));
        })
        .show();
}

function selectGenreForSong(song) {
    showGenres();
    view
       .makeMenu("(#) Select a genre for the song (m) Exit to main menu", /^[0-9m]{1}$/)
       .onUserInput(function (input) {
           switch (input) {
               case 'm':
                   menu.show();
                   break;
               default:
                   var genre = music.values[input-1];
                   genre.music.push(song);
                   console.log("Song %s by %s has been added to genre %s", song.title, song.artist, genre.name);
                   showGenre(genre);
           }
       })
       .show();
}

function showGenreMenu() {
    showGenres();
    view
       .makeMenu("(#) Select a genre (m) Exit to main menu", /^[0-9m]{1}$/)
       .onUserInput(function (input) {
           switch (input) {
               case 'm':
                   menu.show();
                   break;
               default:
                   showGenre(music.values[input-1]);
           }
       })
       .show();
}

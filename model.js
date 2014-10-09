'use-strict';

function makePerson(firstName, lastName) {
    var _person = {
        firstName:  firstName,
        lastName:   lastName,
        
        name:       function() { return _person.firstName + ' ' + _person.lastName; }
    };
    return _person;
}
module.exports.makePerson = makePerson;

module.exports.makePersonFromJSON = function (data) {
    return makePerson(data.firstName, data.lastName);
};

function makeGenre(name, music) {
    var _genre = { 
        name: name,
        music: music, 
    };
    return _genre;
}
module.exports.makeGenre = makeGenre;

module.exports.makeGenreFromJSON = function (data) {
    return makeGenre(data.name, data.music);
};
const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser();
const util = require('util');

let res;
var svgReader = function(filename) {
    let xml_string = fs.readFileSync(filename, 'utf8');

    var stringParser = function(error, result){
        if(error === null) {
            // console.log(result);
            res = util.inspect(result.svg.g,  {depth: null, showHidden: false});
            return (res);
        } else {
            console.log(error);
        }        
    }

    parser.parseString(xml_string, stringParser);

    return (res);
}

module.exports.svgReader = svgReader;
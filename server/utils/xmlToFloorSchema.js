const xmlToFloor = function ( xmlFloorString, floorName = "" ) {

    let JsonString = JSON.parse(xmlParser.toJson(xmlFloorString));
    let Stands = JsonString.svg.g.g.path;
    
    var localizedKeywords = [];
    Stands.forEach(function(item) {
        if(item.desc){
            const localKeyword = {
                name: item.id,
                description: item.desc.$t,
                position : item.d
            };
            localizedKeywords.push(localKeyword);
        }
    });
    
    var floor = {
        name: floorName,
        svg: xmlFloorString,
        keywords : localizedKeywords
    }
    return (floor);
}



module.exports.xmlToFloor = xmlToFloor;
(function(){
    function toArray(xs){
        return Array.prototype.slice.call(xs);
    };

    var tiles = window.tiles = toArray(document.getElementsByClassName('tile'));
    tiles.forEach(function(tile, index){
        tile.style.order = index;
    });
})();

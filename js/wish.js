(function(){
    function toArray(xs){
        return Array.prototype.slice.call(xs);
    };

    var permutation = [1, 0, 3, 2, 5, 4, 7, 6, 8];
    var tiles = window.tiles = toArray(document.getElementsByClassName('tile'));
    tiles.forEach(function(tile, index){
        tile.style.order = permutation[index];
    });
})();

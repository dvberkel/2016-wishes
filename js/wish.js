(function(wish){
    var permutation = new wish.Permutation(1, 0, 3, 2, 5, 4, 7, 6, 8);
    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    tiles.forEach(function(tile, index){
        tile.style.order = permutation.actOn(index);
    });
})(wish);

(function(wish){
    var identity = wish.permutation(0, 1, 2, 3, 4, 5, 6, 7, 8);
    var rotate = wish.permutation(1, 2, 3, 4, 5, 6, 7, 8, 0);
    var permutation = identity.multiply(rotate);
    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    tiles.forEach(function(tile, index){
        tile.style.order = permutation.actOn(index);
    });
})(wish);

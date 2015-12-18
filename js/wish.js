(function(wish){
    var model = new wish.Model();

    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    new wish.View(model, tiles);
})(wish);

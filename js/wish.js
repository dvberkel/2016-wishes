(function(wish){
    var model = new wish.Model();

    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    var view = new wish.View(model, tiles);

    tiles.forEach(function(tile){
        tile.addEventListener('click', function(e){
            model.move(Number.parseInt(e.target.style.order));
        });
    });
})(wish);

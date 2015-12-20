(function(wish){
    var model = new wish.Model();

    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    var view = new wish.View(model, tiles);
    new wish.Controller(model, view);
})(wish);

(function(wish){
    var model = new wish.Model();
    model.shuffle();

    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    var view = new wish.View(model, tiles);
    new wish.Controller(model, view);

    var container = document.getElementById('wish');
    new wish.WishView(model, container);
})(wish);

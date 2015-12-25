(function(wish){
    var model = window.model = new wish.Model();
    do {
        model.shuffle();
    } while (!model.isSolvable());

    var tiles = window.tiles = wish.toArray(document.getElementsByClassName('tile'));
    var view = new wish.View(model, tiles);
    new wish.Controller(model, view);

    var container = document.getElementById('wish');
    new wish.RevealView(model, container);
})(wish);

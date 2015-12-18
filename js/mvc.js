(function($){
    var Model = $.Model = function(){
        this.permutation = $.permutation(0, 1, 2, 3, 4, 5, 6, 7, 8);
        this.rotation = $.permutation(1, 2, 3, 4, 5, 6, 7, 8, 0);
    };
    Model.prototype.rotate = function(){
        this.permutation = this.permutation.multiply(this.rotation);
    };

    var View = $.View = function(model, tiles){
        this.model = model;
        this.tiles = tiles;
        this.update();
    };
    View.prototype.update = function(){
        this.tiles.forEach(function(tile, index){
            tile.style.order = this.model.permutation.actOn(index);
        }.bind(this));
    };
})(window.wish = window.wish || {});

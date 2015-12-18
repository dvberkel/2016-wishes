(function($){
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

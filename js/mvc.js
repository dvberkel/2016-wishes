(function($){
    var Observable = function(){
        this.observersFor = {};
    };
    Observable.prototype.on = function(event, observer){
        (this.observersFor[event] = this.observersFor[event] || []).push(observer);
    };
    Observable.prototype.emit = function(event){
        var args = Array.prototype.slice.call(arguments);
        (this.observersFor[event] || []).forEach(function(observer){
            observer.apply(undefined, args);
        });
    };

    var Model = $.Model = function(){
        Observable.call(this);
        this.permutation = $.permutation(0, 1, 2, 3, 4, 5, 6, 7, 8);
        this.rotation = $.permutation(1, 2, 3, 4, 5, 6, 7, 8, 0);
    };
    Model.prototype = Object.create(Observable.prototype);
    Model.prototype.constructor = Model;
    Model.prototype.rotate = function(){
        this.permutation = this.permutation.multiply(this.rotation);
        this.emit('changed');
    };

    var View = $.View = function(model, tiles){
        this.model = model;
        this.tiles = tiles;
        this.model.on('changed', this.update.bind(this));
        this.update();
    };
    View.prototype.update = function(){
        this.tiles.forEach(function(tile, index){
            tile.style.order = this.model.permutation.actOn(index);
        }.bind(this));
    };
})(window.wish = window.wish || {});

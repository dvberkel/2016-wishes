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

    function positionOf(order){
        return { x: order % 3, y: Math.floor(order/3) };
    }

    function manhattanDistance(a, b){
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    function transposition(a, b){
        var swap = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        swap[a] = b;
        swap[b] = a;
        return new $.Permutation(swap);
    }

    var Model = $.Model = function(){
        Observable.call(this);
        this.permutation = $.permutation(0, 1, 2, 3, 4, 5, 6, 7, 8);
        this.rotation = $.permutation(1, 2, 3, 4, 5, 6, 7, 8, 0);
    };
    Model.prototype = Object.create(Observable.prototype);
    Model.prototype.constructor = Model;
    Model.prototype.move = function(order){
        var blankOrder = this.permutation.actOn(8);
        if (order === blankOrder) { return; }
        if (manhattanDistance(positionOf(order), positionOf(blankOrder)) !== 1) { return; }
        this.swap(order, blankOrder);
    };
    Model.prototype.swap = function(a, b){
        this.permutation = this.permutation.multiply(transposition(a, b));
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

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
        if (this.isSolved()){
            this.emit('solved');
        }
    };
    Model.prototype.isSolved = function(){
        return this.permutation.isIdentity();
    };
    Model.prototype.isSolvable = function(){
        var distance = manhattanDistance(positionOf(8), positionOf(this.permutation.actOn(8)));
        if (distance % 2 === 0) {
            return this.permutation.sign() === 1;
        } else {
            return this.permutation.sign() === -1;
        }
    };
    Model.prototype.shuffle = function(k){
        k = k || 10;
        while (k > 0) {
            var a = Math.floor(9 * Math.random());
            var b = Math.floor(9 * Math.random());
            if (a !== b) {
                this.swap(a, b);
                k--;
            }
        }
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

    var Controller = $.Controller = function(model, view){
        this.model = model;
        this.view = view;
        this.initialize();
    };
    Controller.prototype.initialize = function(){
        this.view.tiles.forEach(function(tile){
            tile.addEventListener('click', function(e){
                this.model.move(Number.parseInt(e.target.style.order));
            }.bind(this));
        }.bind(this));
    };

    var RevealView = $.RevealView = function(model, container, options){
        options = options || {};
        model.on(options.signal || 'solved', this.reveal.bind(this));
        this.container = container;
        this.hide();
    };
    RevealView.prototype.hide = function(){
        this.container.style.display = 'none';
    };
    RevealView.prototype.reveal = function(){
        this.container.style.display = 'block';
    };
})(window.wish = window.wish || {});

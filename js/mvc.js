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
        this.swapCount = 0;
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
        if (++this.swapCount >= 60) {
            this.emit('stumped');
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
        this.swapCount = 0;
    };
    Model.prototype.solve = function(){
        this.permutation = $.permutation(0, 1, 2, 3, 4, 5, 6, 7, 8);
        this.emit('changed');
        this.emit('solved');
    };

    var View = $.View = function(model, tiles){
        this.model = model;
        this.tiles = tiles;
        this.model.on('changed', this.update.bind(this));
        this.model.on('solved', this.solved.bind(this));
        this.update();
    };
    View.prototype.update = function(){
        this.tiles.forEach(function(tile, index){
            tile.style.order = this.model.permutation.actOn(index);
        }.bind(this));
    };
    View.prototype.solved = function(){
        this.tiles.forEach(function(tile){
            tile.classList.add('solved');
        });
    };

    var doNothing = function(){ /* do nothing */ };
    var Controller = $.Controller = function(model, view){
        this.model = model;
        this.view = view;
        this.handlerFor = {};
        this.initialize();
    };
    Controller.prototype.initialize = function(){
        this.handlerFor[ 97] = /* a */ this.moveLeft.bind(this);
        this.handlerFor[119] = /* w */ this.moveUp.bind(this);
        this.handlerFor[115] = /* s */ this.moveDown.bind(this);
        this.handlerFor[100] = /* d */ this.moveRight.bind(this);
        document.body.addEventListener('keypress', this.handleKeypress.bind(this));
        this.view.tiles.forEach(function(tile){
            tile.addEventListener('click', function(e){
                this.model.move(Number.parseInt(e.target.style.order));
            }.bind(this));
        }.bind(this));
    };
    Controller.prototype.moveTile = function(dx, dy){
        var blankPosition = positionOf(this.model.permutation.actOn(8));
        var targetPosition = { x: blankPosition.x + dx, y: blankPosition.y + dy };
        if ((0 <= targetPosition.x && targetPosition.x < 3) &&
            (0 <= targetPosition.y && targetPosition.y < 3)) {
            var targetOrder = 3 * targetPosition.y + targetPosition.x;
            this.model.move(targetOrder);
        }
    };
    Controller.prototype.moveLeft = function(){
        this.moveTile(-1, 0);
    };
    Controller.prototype.moveUp = function(){
        this.moveTile(0, -1);
    };
    Controller.prototype.moveRight = function(){
        this.moveTile(1, 0);
    };
    Controller.prototype.moveDown = function(){
        this.moveTile(0, 1);
    };
    Controller.prototype.handleKeypress = function(event){
        var handler = this.handlerFor[event.charCode] || doNothing;
        handler.call();
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

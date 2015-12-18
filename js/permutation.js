(function($){
    $.permutation = function(){
        return new Permutation($.toArray(arguments));
    };
    var Permutation = $.Permutation = function(image){
        this.image = image;
    };
    Permutation.prototype.actOn = function(element){
        return this.image[element];
    };
    Permutation.prototype.multiply = function(permutation){
        return new Permutation(this.image.map(
            function(element){ return permutation.actOn(element); }
        ));
    };
})(window.wish = window.wish || {});

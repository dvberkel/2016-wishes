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
    Permutation.prototype.isIdentity = function(){
        return this.image.reduce(function(accumalator, element, index){
            return accumalator && (element == index);
        }, true);
    };
})(window.wish = window.wish || {});

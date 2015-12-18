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
})(window.wish = window.wish || {});

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
    Permutation.prototype.sign = function(){
        var product = 1;
        for (var i = 0; i < this.image.length; i++) {
            for (var j = i + 1; j < this.image.length; j++) {
                product *= (this.image[i] - this.image[j]) / (i - j);
            }
        };
        return Math.sign(product);
    };
})(window.wish = window.wish || {});

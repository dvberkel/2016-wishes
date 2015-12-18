(function($){
    var Permutation = $.Permutation = function(){
        this.image = $.toArray(arguments);
    };
    Permutation.prototype.actOn = function(element){
        return this.image[element];
    };
})(window.wish = window.wish || {});

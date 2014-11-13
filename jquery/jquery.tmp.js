;(function($){
//flex-text
    var methods = {
        init: function(params) {
            if (this.data('flex-text')) return;

            //$.extend({}, params, {
            //
            //});

            this.data('flex-text', new FlexText(this[0], params));
            return this;
        },
        update: function(){
            this.data('flex-text').update();
        }
    };

    $.fn.flexText = function(method){
        // немного магии
        if ( methods[method] ) {
            if (!this.data('flex-text')) return;
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            // если первым параметром идет объект, либо совсем пусто
            // выполняем метод init
            return methods.init.apply( this, arguments );
        } else {
            // если ничего не получилось
            $.error( 'Method "' +  method + '" not found at jQuery.flexText');
        }
    };
})(jQuery);


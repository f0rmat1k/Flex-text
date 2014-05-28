;(function(window, document){
    'use strict';

    function bindEvents(){
        var self = this;
        window.addEventListener('resize', function(){

        }, false);
    }

    function getBlocksNodes(blocks){
        var _blocks = [];

        switch (typeof blocks) {
            case 'string':
                _blocks = document.querySelectorAll(blocks);
                break;
            case 'object':
                if (blocks.length && blocks[0].nodeType > 0) {
                    _blocks = [].slice.call(blocks);
                } else if (blocks.nodeType > 0) {
                    _blocks.push(blocks);
                } else {
                    try { console.log('FlexText: wrong block type'); } catch (e) {}
                }
                break;
        }

        this.blocks = _blocks;
    }

    function getParams(){

    }

    bindEvents();

    function FlexText(blocks){
        getBlocksNodes.call(this, blocks);

        bindEvents.call(this);
        getParams.call(this);
    }

    window.FlexText = FlexText;
})(window, document);
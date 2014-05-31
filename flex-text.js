var FlexText = (function(window, document){
    'use strict';
    var self,
        flexTextBlocks = [];

    function bindEvents(){
        window.addEventListener('resize', onWindowResize__flextText, false);
    }

    function onWindowResize__flextText() {
        flexTextBlocks.forEach(function(block){
            makeFlexText.call(block);
        });
    }

    bindEvents();

    function getBlockNode(block){
        var _block;

        switch (typeof block) {
            case 'string':
                _block = document.querySelector(block);
                break;
            case 'object':
                if (block.nodeType > 0) {
                    _block = block;
                } else {
                    try { console.log('FlexText: wrong block type'); } catch (e) {}
                }
                break;
        }

        this._block = _block;
    }

    function makeFlexText() {
        var node = this._block.cloneNode(true),
            text = document.createElement('div'),
            checkContainer = document.createElement('div'),
            resultFs = this._currentFs || this._baseFs;

//            node.style.width = this._block.clientWidth + 'px';
        node.style.width = window.getComputedStyle(this._block, null).getPropertyValue('width');
//            node.style.height = this._block.clientHeight + 'px';
        node.style.height = window.getComputedStyle(this._block, null).getPropertyValue('height');

        text.innerHTML = node.innerHTML;
        node.innerHTML = '';
        node.appendChild(text);

        checkContainer.style.position = 'fixed';
        checkContainer.style.visibility = 'hidden';
        checkContainer.style.zIndex = -10;
        checkContainer.style.left = '500px';
        checkContainer.appendChild(node);

        document.body.appendChild(checkContainer);

//            var nodeHeight = Math.floor(+ window.getComputedStyle(node, null).getPropertyValue('height').replace('px', ''));
        var nodeHeight = + window.getComputedStyle(node, null).getPropertyValue('height').replace('px', '');

//            console.log(window.getComputedStyle(node, null).getPropertyValue('height'));

        if ((+ window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '')) > nodeHeight) {
            while((+ window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '')) > nodeHeight){
                resultFs -= 1;
                text.style.fontSize = resultFs + 'px';
            }
        } else if ((+ window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '')) < nodeHeight) {
            while((+ window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '')) < nodeHeight){
                resultFs += 1;
                text.style.fontSize = resultFs + 'px';
            }
            resultFs -= 1;
        }

        this._currentFs = resultFs;
        this._block.style.fontSize = resultFs + 'px';
        checkContainer.remove();
    }

    function collectParams(){
        this._baseFs = parseInt(window.getComputedStyle(this._block, null).getPropertyValue('font-size'), 10);
//            this._height = this._block.clientHeight;
//            this._height = window.getComputedStyle(this._block, null).getPropertyValue('height');
    }

    function FlexText(block){
        self = this;
        flexTextBlocks.push(this);
        getBlockNode.call(this, block);
        collectParams.call(this);
        makeFlexText.call(this);
    }

    return FlexText;
})(window, document);
;(function(window, document){
    'use strict';
    var self;
    function bindEvents(){
        window.addEventListener('resize', function(){
            makeFlexText.call(self);
        }, false);
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

        node.style.width = this._block.clientWidth + 'px';
        node.style.height = this._block.clientHeight + 'px';
        text.innerHTML = node.innerHTML;
        node.innerHTML = '';
        node.appendChild(text);

        checkContainer.style.position = 'fixed';
        checkContainer.style.visibility = 'hidden';
        checkContainer.style.zIndex = -10;
        checkContainer.style.left = '500px';
        checkContainer.appendChild(node);

        document.body.appendChild(checkContainer);

        if (text.clientHeight > node.clientHeight) {
            while(text.clientHeight > node.clientHeight){
                resultFs -= 1;
                text.style.fontSize = resultFs + 'px';
            }
        } else {
            while(text.clientHeight < node.clientHeight){
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
        this._height = this._block.offsetHeight;
    }

    bindEvents();

    function FlexText(block){
        self = this;
        getBlockNode.call(this, block);
        collectParams.call(this);
        makeFlexText.call(this);
    }

    window.FlexText = FlexText;
})(window, document);
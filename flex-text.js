var FlexText = (function(window, document){
    'use strict';
    var flexTextBlocks = [];

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
            // string with css-selector
            case 'string':
                _block = document.querySelector(block);
                break;
            case 'object':
                // DOM-node
                if (block.nodeType > 0) {
                    _block = block;
                } else {
                    throw new Error('FlexText: wrong block type');
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

        node.style.width = window.getComputedStyle(this._block, null).getPropertyValue('width');
        node.style.height = window.getComputedStyle(this._block, null).getPropertyValue('height');

        text.innerHTML = node.innerHTML;
        node.innerHTML = '';
        node.appendChild(text);

        checkContainer.style.position = 'fixed';
        checkContainer.style.visibility = 'hidden';
        checkContainer.style.zIndex = -9999;
        checkContainer.appendChild(node);

        document.body.appendChild(checkContainer);
        var nodeHeight = + window.getComputedStyle(node, null).getPropertyValue('height').replace('px', '');

        if (window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') > nodeHeight) {
            while(window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') > nodeHeight){
                if (resultFs > this._options.min) {
                    resultFs -= this._options.step;
                    text.style.fontSize = resultFs + 'px';
                } else {
                    this._options.onOverflow.call(this, {
                        block: this._block,
                        fontSize: resultFs
                    });

                    break;
                }
            }
        } else if (window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') < nodeHeight) {
            while(window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') < nodeHeight){
                if (resultFs < this._options.max) {
                    resultFs += this._options.step;
                    text.style.fontSize = resultFs + 'px';
                } else {
                    break;
                }
            }

            resultFs -= this._options.step;
        }
        resultFs > this._options.max ? resultFs = this._options.max : null;
        this._currentFs = resultFs;
        this._block.style.fontSize = resultFs + 'px';
        checkContainer.parentNode.removeChild(checkContainer);
    }

    function collectParams(){
        this._baseFs = parseInt(window.getComputedStyle(this._block, null).getPropertyValue('font-size'), 10);
    }

    function FlexText(block, options){
        var resultOptions = {
            min: 5,
            max: 999,
            step: 0.1,
            onOverflow: function(){}
        };

        //extend ops
        Object.keys(options).forEach(function(prop){
            resultOptions[prop] = options[prop];
        });

        this._options = resultOptions;
        flexTextBlocks.push(this);
        getBlockNode.call(this, block);
        collectParams.call(this);
        makeFlexText.call(this);
    }

    return FlexText;
})(window, document);

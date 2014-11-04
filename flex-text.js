var FlexText = (function(window, document){
    'use strict';
    var listForResizeUpdate = [];

    function bindEvents(){
        window.addEventListener('resize', onWindowResize__flextText, false);
    }

    function onWindowResize__flextText() {
        listForResizeUpdate.forEach(function(block){
            makeFlexText.call(block);
        });
    }

    function onOverflow(params){
        var resultFs,
            overflowSize;

        if (params) {
            params.fs < this._options.min ? resultFs = this._options.min : resultFs = this._baseFs;
            overflowSize = params.overflowSize;
        }

        this._options.onOverflow.call(this, {
            block: this._block,
            fontSize: resultFs,
            overflowSize: overflowSize
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
        var nodeHeight = + node.style.height.replace('px', ''),
            textHeight = window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '');

        console.log(textHeight);
        if (textHeight > nodeHeight) {
            if (Object.keys(this._options.origin).length === 1 && this._options.origin.onOverflow) {
                onOverflow.call(this, {
                    overflowSize: textHeight - nodeHeight
                });
                return;
            }

            while(window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') > nodeHeight) {
                if (resultFs > this._options.min) {
                    resultFs -= this._options.step;
                    text.style.fontSize = resultFs + 'px';
                } else {
                    onOverflow.call(this, { fs: resultFs });
                    break;
                }
            }
        } else if (textHeight < nodeHeight) {
            while(window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') < nodeHeight){
                if (resultFs < this._options.max) {
                    resultFs += this._options.step;
                    text.style.fontSize = resultFs + 'px';
                } else {
                    break;
                }
            }

            if (window.getComputedStyle(text, null).getPropertyValue('height').replace('px', '') > nodeHeight) {
                resultFs -= this._options.step;
            }
        }
        resultFs > this._options.max ? resultFs = this._options.max : null;
        resultFs < this._options.min ? resultFs = this._options.min : null;
        this._currentFs = resultFs;
        this._block.style.fontSize = resultFs + 'px';
        checkContainer.parentNode.removeChild(checkContainer);
    }

    function collectParams(){
        this._baseFs = parseInt(window.getComputedStyle(this._block, null).getPropertyValue('font-size'), 10);
    }

    function enableLiveUpdate(){
        var interval = typeof this._options.live === 'number' ? this._options.live : 50;
        setInterval(function(){
            makeFlexText.call(this);
        }.bind(this), interval);
    }

    function FlexText(block, options){
        var resultOptions = {
            min: 5,
            max: 999,
            step: 0.1,
            live: false,
            resize: false,
            onOverflow: function(){}
        };

        options = options || {};

        //extend ops
        Object.keys(options).forEach(function(prop){
            resultOptions[prop] = options[prop];
        });

        this._options = resultOptions;
        this._options.origin = options;

        if (options.resize === true) {
            listForResizeUpdate.push(this);
        }

        getBlockNode.call(this, block);
        collectParams.call(this);
        makeFlexText.call(this);

        if (this._options.live) {
            enableLiveUpdate.call(this);
        }
    }

    //Methods
    FlexText.prototype = {
        constructor: FlexText,
        update: function(){
            makeFlexText.call(this);
        }
    };

    return FlexText;
})(window, document);

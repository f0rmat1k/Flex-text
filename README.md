# Flex-text
flex-text plugin makes your font-size flexible with block size.

## Usage
```javasscript
new FlexText(document.querySelector('.your-text-block', {
    //params
});
```

## Documentation
### Options
`resize`: [bool, default: false] – Update font-size with window resize event;

`min`: [float, default: 5] – the minimal font-size, which plugin can use;

`max`: [float, default: 999] – the maximal font-size, which plugin can use;

`live`: [int/bool, default: false] - live update with interval. So you can specify interval `live: 100`;

`step`: [float, default: 0.1] - allowable step for plugins' working. Not recommended to change it.

### Callbacks
`onOverflow`: function calling in situation, when text does not fit in the block. Important: if it is only options, plugin will not work, only execute callback.
It's useful, when you don't want to change text, but want to know about overflow (e.g., you can send ajax request about this situation);

//https://kontur.ru/ideas
//https://yadi.sk/i/Xp3cPxrYbmawt

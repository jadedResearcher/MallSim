
//immediately envoked function does't run into namespacign issues
(() => {
    const src = `zampanio is a really good game
    you should play it`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()



//immediately envoked function does't run into namespacign issues
(() => {
    const link = 'http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/dreams.pdf'
    const src = `<a target ="_blank" href = '${link}'>${link}</a>`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()


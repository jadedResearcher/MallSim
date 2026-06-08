
//immediately envoked function does't run into namespacign issues
(() => {
    const link = 'http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/jr_tumblr_posts.pdf'
    const src = `<a target ="_blank" href = '${link}'>${link}</a>`

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()


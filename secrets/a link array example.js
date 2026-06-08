
//immediately envoked function does't run into namespacign issues
(() => {
    const linksRaw = ``;
    const links = linksRaw.split("\n")

    for (let link of links) {
        src += `<a target ="_blank" href = '${link}'>${link}</a>`;;
    }

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()


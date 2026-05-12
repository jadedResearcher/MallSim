
//immediately envoked function does't run into namespacign issues
(() => {
    const src = `<div style='background: black;color: white;font-family: Courier New;padding: 31px;'>
    
    Parts of the mall differ little from what might expect of an underground, long abandoned former bastion of humanity.

    The rot seeps into everthing, pushing out the illusions of particle board and wood facades.

    These areas, labeled as falling under the "Corruption" aspect, are to be especially avoided.

    Any step may break through a rotten floor board. The very air promises a slow and miserable death from illness.

    Any harvest fruit found here would surely be inedible.

    <img style='width: 75%'src='http://farragofiction.com/MallSim/images/Diorama/CamillesDeathInAnOrangeJulius/the_rot_takes_all_in_the_end.JPG'>
</div>
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()


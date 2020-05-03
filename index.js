const inquirer = require('inquirer')
const term = require( 'terminal-kit' ).terminal
const Petrus = require('petrus')
const open = require('open')

function startPrompt() {
    inquirer.prompt([{
        type:'input',
        message:'What would you like to search for?',
        name: 'var'
    },{
        type: 'number',
        message: 'how many results would you like?',
        name: 'quantity'
    }]).then(function(data){
        search(data.var, data.quantity)
    })
}

function search(query, quantity) {
    Petrus.search(query)
    .then(results => {
    let tops = results.slice(0, quantity)
    let objArr = []
    let linkArr = []
    for(var i = 0; i < tops.length; i++){
        let link = tops[i].magnetLink
        let linkParseA = link.split('&dn=')
        let rawTitle = linkParseA[1]
        let rawTitleArr = rawTitle.split('%')
        let rawFinal = rawTitleArr[0]
        let spaceArr = rawFinal.split('+')
        let titleStr = spaceArr.join(' ')
        let titleTidy = titleStr.split('&amp')
        let ditchDotsRaw = titleTidy[0]
        let ditchDots = ditchDotsRaw.split('.')
        let ditchDotsParse = ditchDots.join(' ')
        let obj = {title: ditchDotsParse, size: results[i].size, seeds: results[i].seeder}
        objArr.push(obj)
        linkArr.push(link)
    }
    titleSelect(objArr, linkArr)
    })
    .catch(err => {
        console.error(err)
    })
}

function titleSelect(dataObj, linkArr) {
    let parseArr = []
    for(var i = 0; i < dataObj.length; i++){
        let str = `${dataObj[i].title} - Size: ${dataObj[i].size} - Seeds: ${dataObj[i].seeds}`
        parseArr.push(str)
    }
    let promptArr = parseArr
    promptArr.push('Search Again')
    promptArr.push('Exit Application')
    inquirer.prompt({
        type: 'list',
        choices: promptArr,
        message: 'Which would you like to download?',
        name: 'mediaChoice'
    }).then(function(data){
        switch (data.mediaChoice){
            case 'Search Again':
                startPrompt()
                break
            case 'Exit Application':
                break
            default:
        for( var i = 0; i < parseArr.length; i++){
            if(data.mediaChoice === parseArr[i]){
                openLink(linkArr[i])
            }
        }
    }})
}

async function openLink (link) {
    await open(link).then(
        startPrompt()
    )
}

term.drawImage( './assets/images/ship.PNG' ,  function(err){
    if(err){console.log(err)}
} )

setTimeout(function(){ startPrompt() }, 2400)
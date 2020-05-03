const inquirer = require('inquirer')
const Petrus = require('petrus')

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
        let obj = {title: titleStr, size: results[i].size, seeds: results[i].seeder}
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
    inquirer.prompt({
        type: "list",
        choices: parseArr,
        message: "Which would you like to download?",
        name: 'mediaChoice'
    }).then(function(data){
        for( var i = 0; i < parseArr.length; i++){
            if(data.mediaChoice === parseArr[i]){
                console.log(parseArr[i])
                console.log(linkArr[i])
            }
        }
    })
}

startPrompt()
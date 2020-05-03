const inquirer = require('inquirer')
const Petrus = require("petrus")

function startPrompt() {
    inquirer.prompt({
        type:"input",
        message:"Who would you like to blow?",
        name: "var"
    }).then(function(data){
        search(data.var)
    })
}

function search(query) {
    Petrus.search(query)
    .then(results => {
    let top5 = results.slice(0, 5)
    console.log(top5)
    })
    .catch(err => {
        console.error(err)
    })
}

startPrompt()



// const PirateBay = require('thepiratebay')

// PirateBay.search('game of thrones', {
//     category: 205
//   })
//   .then(results => console.log(results))
//   .catch(err => console.log(err))

// async function search() {
//     await PirateBay.search('harry potter', {
//         category: 'video',
//         page: 1
//       })
//       console.log(searchResults)
// }

// search()
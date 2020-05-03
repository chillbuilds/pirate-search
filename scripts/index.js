import PirateBay from 'thepiratebay'

PirateBay.search('Game of Thrones', {
    category: 205
  })
  .then(results => console.log(results))
  .catch(err => console.log(err))
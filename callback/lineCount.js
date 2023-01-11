import fs from 'fs-extra-promise'

const fileName= process.argv[2]

fs.readFileAsync(fileName, {encoding : 'utf-8'})
    .then(data => {
        const length = data.split('\n ').length-1
        console.log(`${fileName}:${length}`)
    })
    .catch( err => {
        console.error(err.message)
    })
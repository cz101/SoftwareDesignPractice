import glob from 'glob-promise'
import fs from 'fs-extra-promise'


// const main = (srcDir) =>{
//     glob(`${srcDir}/**/*.*`)
//         // .then(files => Promise.all(files.map(f=>statPair(f))))
//        // .then(files => files.filter(pair => pair.stats.isFile()))
//        // .then(files => files.map(pair => pair.filename))
//         .then(files => Promise.all(files.map(f => lineCount(f))))        
//         .then (counts => counts.forEach(
//             c =>console.log(`${c.lines}:${c.name}`)
//             ))
//         .catch(err => console.log(err.message))
//     }

// const lineCount = (fileName) =>{
//     return new Promise( (resolve, reject)=>{
//         fs.readFileAsync(fileName,{encoding : 'utf-8'})
//             .then( data => resolve({
//                 name: fileName,
//                 lines: data.split('\n').length-1
//             }
//                 ))
//             .catch(err => reject(err))
//         })
// }

// const statPair = (fileName)=>{
//     return new Promise((resolve,reject)=>{
//         fs.statAsync(fileName)
//           .then(stats => resolve({fileName, stats}))
//           .catch(err=>reject(err))
//         })
// }

    const statPair = async (filename) => {
            const stats = await fs.statAsync(filename)
             return{filename,stats}
        }

    const lineCount = async(filename) => {
        const data = await fs.readFileAsync(filename, 'utf-8 ')
        return{
                filename,
                lines:data.split('\n ').length-1
                }
         }

 const main = async(srcDir)  =>{
    console.log("here it is ")
    const files = await glob(`${srcDir}/**/*.* `)
    const pairs = await Promise.all(
         files.map(async filename=> await statPair(filename))
     )
     console.log("here it is :"+pairs) 
     const filtered = pairs
             . filter(pair => pair.stats.isFile())
             . map(pair => pair.filename) 
      const counts = await Promise.all(
        filtered.map(async name => await lineCount(name)))

      counts.forEach(
            ({filename,lines})=>console.log(`${lines}:${filename}`)
            )
      
 }

const srcDir = process.argv[2]
main(srcDir)
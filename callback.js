// [1000,1500,500].forEach(t=>{ 
//     console.log(` abouttosetTimeoutfor${t}`)
//      setTimeout(()=>console.log(` insidetimerhandlerfor${t}`),t)}) 

//import Pledge from './Pledge.js '


class Pledge{

    constructor(action){
        this.actionCallbacks = []
        this.errorCallback = () => {}
        action(this.onResolve.bind(this), this.onReject.bind(this))
    }
    then(thenHandler){
        this.actionCallbacks.push(thenHandler)
        return this
    }
    catch(errorHandler){
            this.errorCallback=errorHandler
            return this
    }

    onResolve(value){
            let storedValue = value
        try{
                this.actionCallbacks.forEach((action)=>{
                        storedValue = action(storedValue)
                    })
                } catch(err){
                    this.actionCallbacks = []
                    this.onReject(err)
                }
        }

    onReject(err){this.errorCallback(err)}
}    

new Pledge((resolve,reject)=>{

    console.log('top of a single then clause ')
    
    setTimeout(()=>{
        console.log('about to call resolve callback ') 
        resolve(' this is the result ')
        console.log(' after resolve callback ')      
    },0)
        console.log('end of action callback ')
    }).then((value)=>{

        console.log(`in  first 'then ' with "${value}" `)
        return  'first then value '
    }).then((value)=>{
        console.log(`in sec 'then ' with "${value}" `)
        return  'second then value '

    }) 
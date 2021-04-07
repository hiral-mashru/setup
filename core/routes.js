const { readdirSync } = require('fs')
const chalk = require('chalk')
const fs = require('fs')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const apis = getDirectories(__dirname + '/../api');

var publicRoutes = [];
var protectedRoutes = [];
var routes = {};

//for..of takes value, for..in takes key
for(let key in apis){
    if(fs.existsSync(__dirname+'/../api/'+apis[key]+'/routes.json')){
        routes = require(`../api/${apis[key]}/routes.json`)
        if(Array.isArray(routes)){
            for(var route in routes){
                looping(apis[key],routes[route],routes, publicRoutes, protectedRoutes)
            } 
        } else if(typeof routes === 'object'){
            rr = routes
            looping(apis[key],rr,routes, publicRoutes, protectedRoutes)
        } else {
            console.log(chalk.black.bgYellowBright('WARNING:')+`The format of ${__dirname}\\..\\api\\${apii}\\routes.json is not correct.`)
        }
    } else {
        console.log(chalk.black.bgYellowBright('WARNING:')+`PATH: ${__dirname}\\..\\api\\${apii}\\routes.json is not available`) // 1
    }
}

function looping(apii,rr,routes, publicRoutes, protectedRoutes){
    var controllerlArr = rr.action.split('.')
    if(controllerlArr.length != 2 || !rr.path || !rr.method ){
        console.log(chalk.black.bgYellowBright('WARNING:')+`There is an problem with API : '${apii}' ROUTE PATH: ${rr.path} METHOD: ${rr.method}`)
    } else {
        // routes
        let pathh = rr.path.charAt(0) != '/' ? `/${rr.path}`: rr.path 
        if(rr.root){
            rr.path = `/${apii}${pathh}`
        }
        else {
            rr.path = `${pathh}`
        }

        // action
        var controllerName, funName 
        [controllerName, funName] = [controllerlArr[0],controllerlArr[1]]
        var func = (require(`../api/${apii}/controllers/${controllerName}`))[funName]
        if(!func){
            console.log(chalk.black.bgYellowBright('WARNING:')+`There is an problem with API : '${apii}' ACTION: '${funName}' was not found.`)
        } else {
            rr.action = func;

            //middleware
            if('middlewares' in rr && Array.isArray(rr.middlewares)){
                var middlewareFun = []
                var middleware = []
                for(let a of rr.middlewares) {
                    if(!(a.includes('.'))) { 
                        console.log(chalk.black.bgYellowBright('WARNING:')+`Global Middleware ${rr.globalMiddleware} is not properly defined in ${__dirname}\\..\\api\\${apii}\\routes.json`) 
                        return
                    } else {
                        var middlewareArr = a.split('.')
                        if(middlewareArr.length != 2){
                            console.log(chalk.black.bgYellowBright('WARNING:')+`Middleware is not defined in  routes.json file of ${apii}, PATH: ${pathh}`)
                            return
                        }
                        var [middlewareName, middlewareFunName] = middlewareArr
                        middleware.push(middlewareName)
                        if(!(require(`../api/${apii}/middlewares/${middlewareName}`))[middlewareFunName]){
                            console.log(chalk.black.bgYellowBright('WARNING:')+`Middleware ${middlewareFunName} doesn't exists in ${__dirname}\\..\\api\\${apii}\\middlewares\\${middlewareName} file.`)
                            return
                        } else {
                            middlewareFun.push((require(`../api/${apii}/middlewares/${middlewareName}`))[middlewareFunName])
                        }
                    }
                }
                rr.middlewares = middlewareFun
                // console.log(rr.middleware)
            } else { rr.middlewares = [] }

            //global middleware
            if('globalMiddleware' in rr && Array.isArray(rr.globalMiddleware)){
                var globalMiddlewareFun = []
                var globalMiddleware = []

                for(let a of rr.globalMiddleware) {
                    if(!(a.includes('.'))) { 
                        console.log(chalk.black.bgYellowBright('WARNING:')+`Global Middleware ${rr.globalMiddleware} is not properly defined in ${__dirname}\\..\\api\\${apii}\\routes.json`) 
                        return
                    } else {
                        var globalMiddlewareArr = a.split('.');
                        if(globalMiddlewareArr.length != 2){
                            console.log(chalk.black.bgYellowBright('WARNING:')+` Global Middleware is not defined in  routes.json file of ${apii}, PATH: ${pathh}`)
                            return
                        }
                        var [globalMiddlewareName, globalMiddlewareFunName] = globalMiddlewareArr
                        globalMiddleware.push(globalMiddlewareName)
                        if(!(require(`../middlewares/${globalMiddlewareName}`))[globalMiddlewareFunName]){
                            console.log(chalk.black.bgYellowBright('WARNING:')+`Global Middleware ${globalMiddlewareFunName} doesn't exists in ${__dirname}\\..\\middlewares\\${globalMiddlewareName} file.`)
                            return;
                        } else {
                            globalMiddlewareFun.push((require(`../middlewares/${globalMiddlewareName}`))[globalMiddlewareFunName])      
                        }
                    }
                    // console.log("x",rr.globalMiddleware)
                }
                rr.globalMiddleware = globalMiddlewareFun
            }  else { rr.globalMiddleware = [] }


            if(rr.public){
                publicRoutes.push(rr)
            } else {
                protectedRoutes.push(rr)
            }
        }
    }
} 

// console.log("rr",path)

module.exports = {
    public: publicRoutes,
    protected: protectedRoutes 
}
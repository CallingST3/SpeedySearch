const ssearch = require('../lib/index'); 

ssearch.setup()

setTimeout(function(){
    console.log(ssearch.search("Youtube"))
},2000)
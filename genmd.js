var fs = require('fs');
var path = require('path');
const api = require('./util/api')

var getTags = function (arr){
    var tags ='';
    for (t in arr){
        tags +=arr[t].name+' '
    }
    return tags;
}

var getFileName = function (time,title) {
    return time.substr(0,time.indexOf('T'))+'-'+title.replace(/^\s+|\s+$/g,"")+'.md';
}

var calFilePath = function (time,filename) {
    var dateTime =time.substr(0,time.indexOf('T')).split('-')
    var path='./source/_posts/'+dateTime[0]+'/';
    path +=dateTime[1]+'/';
    path +=dateTime[2]+'/'
    return path;
}

var fsExistsSync =function (path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
var mkdirsSync = function (dirname){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname))){
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

api.get('lirawx/mirror/issues',{}).then(res =>{
    let data = res.data
    for (iss in data){
        if(data[iss].state=='open'){

            var article = '';
            article+='---\n';
            article+='layout: post\n';
            article+='tags: '+getTags(data[iss].labels)+'\n';
            article+='title: '+data[iss].title+'\n';
            article+='date: '+data[iss].created_at+'\n';
            article+='---\n\n';
            article+=data[iss].body;
            var fN = getFileName(data[iss].created_at,data[iss].title);
            var filePath =calFilePath(data[iss].created_at,fN);
            if(!fsExistsSync(filePath)){

               if (mkdirsSync(filePath)){
                var out = fs.createWriteStream(filePath+fN,{encoding:'utf-8','flag': 'a'});
                out.write(article);
                out.end();
                console.log(fN+'----- 已经写入');
               }
                
            }else if(!fsExistsSync(filePath+fN)){
                var outs = fs.createWriteStream(filePath+fN,{encoding:'utf-8','flag': 'a'});
                outs.write(article);
                outs.end();
                console.log(fN+'----- 已经写入');
            }else{
                console.log(fN+'----- 已经存在');
            }


    }
    }
  })



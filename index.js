const fs = require("fs");
const fse = require("fs-extra");
var logPassArray = new Array()
var input = new Array()
var tempall = new Array()
var MafilesNames = new Array()
var JSONSNames = new Array()
var renameMafilesNames = new Array()
var templog
var temppass
let NotUsedMaFiles = 0
let subfold = 0
let accountsPerFolder
let countFounded
let content

console.log(""+
"╔═════════════════════════════════════════════════════════════╗" + "\n" +
"║  t.me/e11eventhhh    ╔═══╗╔╗─╔╗╔═══╦╗──╔╦═══╦═╗─╔╦════╦╗─╔╗ ║"+ "\n" +
"║ ╔═════╦╦═══╦╦═════╗  ║╔══╬╝║╔╝║║╔══╣╚╗╔╝║╔══╣║╚╗║║╔╗╔╗║║─║║ ║" + "\n" +
"║ ║╔═╦═╦╝╠═╗ ║╚╗╔╦╗ ║  ║╚══╬╗║╚╗║║╚══╬╗║║╔╣╚══╣╔╗╚╝╠╝║║╚╣╚═╝║ ║" + "\n" +
"║ ║║╠╣║║║║╩╣ ║║║║║║ ║  ║╔══╝║║─║║║╔══╝║╚╝║║╔══╣║╚╗║║─║║─║╔═╗║ ║" + "\n" +
"║ ║╚═╩═╩═╩═╝ ╚═╝╠╗║ ║  ║╚══╦╝╚╦╝╚╣╚══╗╚╗╔╝║╚══╣║─║║║─║║─║║─║║ ║" + "\n" +
"║ ╚═════════════╚═╝═╝  ╚═══╩══╩══╩═══╝─╚╝─╚═══╩╝─╚═╝─╚╝─╚╝─╚╝ ║" + "\n" +
"╚═════════════════════════════════════════════════════════════╝" + "\n")

if(fs.existsSync('Files/DoneFolders')){
    console.log("Deleting the old DoneFolders folder and creating a new one")
    fse.remove('Files/JSONS', err => {
        if (err) return console.error(err)
    })
    fse.remove('Files/NotUsedJSONS', err => {
        if (err) return console.error(err)
    })
    fse.remove('Files/NotUsedMaFiles', err => {
        if (err) return console.error(err)
    })
    fse.remove('Files/DoneFolders', err => {
        if (err) return console.error(err)
        prego()
    })
} else {
    prego()
}

function prego(){
    const Stream = require('stream')
    const writableStream1 = new Stream.Writable()
    console.log("Enter the number of accounts per folder:")
    writableStream1._write = (chunk, encoding, next) => {
    let last_input = chunk.toString().replace(/(\r\n|\n|\r)/gm,"") 
    accountsPerFolder = last_input
    process.stdin.push(null)
    go()
}
process.stdin.pipe(writableStream1)
}

function go(){
    getAllMafilesNames()
    addFolders()
    initjsons()
    createSubfolder()
    renameMafiles()
    joinJsonsAndMafiles()
}

function addFolders(){ 
    if (!fs.existsSync('Files/JSONS')) {
        fs.mkdirSync('Files/JSONS');
    }

    if (!fs.existsSync('Files/DoneFolders')) {
        fs.mkdirSync('Files/DoneFolders');
    } 

    if (!fs.existsSync('Files/DoneFolders/subs')) {
        fs.mkdirSync('Files/DoneFolders/subs');
    } 

    if (!fs.existsSync('Files/DoneFolders/txts')) {
        fs.mkdirSync('Files/DoneFolders/txts');
    } 
    
    if (!fs.existsSync('Files/RenamedMafiles')) {
        fs.mkdirSync('Files/RenamedMafiles');
    }
}

function initjsons(){ 
    logPassArray = fs.readFileSync('Files/logpass.txt').toString().split("\r\n");
        for(let i in logPassArray){
            tempall = logPassArray[i].split(":")
            templog = tempall[0]
            temppass = tempall[1]
            countFounded++
            createJSON()
        }
}

function createJSON(){
    content = fs.readFileSync("Files/JSON_sample.txt", "utf8");
    let content2 = content.replace("templog",templog)
    content2 = content2.replace("temppass",temppass)
    let directory = 'Files/JSONS/' + templog + '.json'
    fs.writeFileSync(directory, content2);
}

function createSubfolder(){
    let yy = Math.round(logPassArray.length/accountsPerFolder)
    for(let i = 0; i<=yy; i++){
        if (fs.existsSync('Files/DoneFolders/subs/sub' + i)) return
        fs.mkdirSync('Files/DoneFolders/subs/sub' + i);
        fs.writeFile('Files/DoneFolders/txts/sub' + i + ".txt", "", function(err){
            if (err) {
                console.log(err);
            }
        });
    }
}

function getAllMafilesNames(){
    fs.readdirSync('Files/Mafiles').forEach(file => {
        MafilesNames.push(file)
      });
}

function renameMafiles(){
    let arrlength = MafilesNames.length
    for(let i = 0; i<arrlength; i++){
        let mafile = fs.readFileSync('Files/Mafiles/' + MafilesNames[i]); 
        let mafiledata = JSON.parse(mafile); 
        let accName = mafiledata.account_name
        fs.copyFileSync('Files/Mafiles/' + MafilesNames[i], 'Files/RenamedMafiles/' + accName + '.maFile');
    }
}

function joinJsonsAndMafiles(){
    fs.readdirSync('Files/JSONS').forEach(file => {
        JSONSNames.push(file)
    })
    fs.readdirSync('Files/RenamedMafiles').forEach(file => {
        renameMafilesNames.push(file)
    })
    checkNotUsedMaFiles()
    if(JSONSNames.length<renameMafilesNames.length){
        console.log("Founded " + logPassArray.length + " JSONs and " + renameMafilesNames.length + " maFiles, what more then number of JSONs")
    } else {
        console.log("Founded " + logPassArray.length + " JSONs and " + renameMafilesNames.length + " maFiles")
    }

    let count = 0
    let filedcount = 0
    for(let i = 0; i<JSONSNames.length; i++){
        if(count>=accountsPerFolder){ 
            subfold++                  
            count = 0                
        }
        let tt = JSONSNames[i].split(".")  
        var ee = tt[0]+".maFile" 

        if(fs.existsSync('Files/JSONS/' + JSONSNames[i]) && fs.existsSync('Files/RenamedMafiles/' + ee)) { 
            gogo()
        } else {
            if(fs.existsSync('Files/JSONS/' + JSONSNames[i]) && !fs.existsSync('Files/RenamedMafiles/' + tt)){
            } else {
                console.log("xyita")
            }
            filedcount++
            copybadjson()
            function copybadjson(){
                fse.copy('Files/JSONS/' + JSONSNames[i], 'Files/NotUsedJSONS/' + JSONSNames[i], err => { 
                    if(err) throw err;
                });
            }
        }

        function gogo() {
            copyjson()
            copymafile()
            writetxt()
            count += 1 
            function writetxt(){
                 fs.appendFileSync('Files/DoneFolders/txts/' + 'sub' + subfold + '.txt', '\r\n' + JSONSNames[i]);
            }
            function copyjson(){ 
                fse.copy('Files/JSONS/' + JSONSNames[i], 'Files/DoneFolders/subs/' + 'sub' + subfold + '/' + JSONSNames[i], err => { 
                    if(err) throw err;
                });
            }
            function copymafile(){ 
                fse.copy('Files/RenamedMafiles/' + ee, 'Files/DoneFolders/subs/' + 'sub' + subfold + '/' + ee, err => {
                    if(err) console.error(err);
                });
            }
        }
    }

    console.log(NotUsedMaFiles + " not needed maFiles and " + filedcount + " JSONs havent maFile")
    console.log('See it in NotUsedMaFiles and NotUsedJSONS folders')
}

function checkNotUsedMaFiles(){
    for(let i = 0; i<renameMafilesNames.length; i++){
        let qq = renameMafilesNames[i].split(".")  
        let ll = qq[0]
        if(!fs.existsSync('Files/JSONS/' + ll + ".json") && fs.existsSync('Files/RenamedMafiles/' + renameMafilesNames[i])){
            fse.copy('Files/RenamedMafiles/' + renameMafilesNames[i], 'Files/NotUsedMaFiles/' + renameMafilesNames[i], err => { 
                if(err) console.error(err);
            });
            NotUsedMaFiles++
        }
    }
}
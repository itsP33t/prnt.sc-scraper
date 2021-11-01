const imgParser = require("lightshot-parser")
const fs = require('fs');
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);
const ps = require('prompt-sync');
const chalk = require('chalk');
const prompt = ps();

// logo files
const logo1 = ("  ####   ####  #####    ##   #####  ###### #   # \n  #      #    # #    #  #  #  #    # #       # #  \n   ####  #      #    # #    # #    # #####    #   \n       # #      #####  ###### #####  #        #   \n  #    # #    # #   #  #    # #      #        #   \n   ####   ####  #    # #    # #      ######   #   ")
const logo2 = ("                                                                                 \n                                                                                \n                                                                                \n                                                              *,,*,,,,*         \n                                                          ,,,,*,,*.,,*/*        \n                                                       *,*,*,,,,**,*(#%.        \n                                                   .*,,,,..,,,*/##%%%/,         \n                                                /,,,,,,,,,,((%%&#(*,.           \n                                             (,*,..,,,,((%%%#/*,.               \n                               .............,%##,,*(##%%#/*,                    \n                    ,,,,,,,,,.,................#(#%%(/*,                        \n            .*,,,,,,,,,,,,,,,,,,,....,,.........(/,,                            \n       . ..,,,,,,,,,,,,,,,,,,,,,,,,.,......... *.                              \n     ,/(*  ..,,,,,,,,,,,,,,,,,,,,,,,,,....... ,                                 \n      .*(#*  .,..,,,,,,,,,,,,,,,,,,,,,,.....*,                                  \n        .*((,  ...,,,,,,,,,,,,,,,,,,.......*                                    \n          .*(#,  ...,,,,,,,,,,,,,,,,,....*.                                     \n            .*(#,  ..,,,,,,,,,,,,,,,..,*.                                       \n              .*(#.  .,,,,,,,,,,,,..(*.                                         \n                ,*(#.  ..,,,.,,,.*/,.                                           \n                  ,*(#.  .....*/*.                                              \n                    ,*(#   #/,.                                                 \n                      ,*/*,                                                     ")

console.clear();
console.log(chalk.red(logo1));
console.log(chalk.blue('Scrapey by P33t.net'))
console.log("\n\n");
console.log(chalk.green('Enter amount of images you want\n'))
let amount = prompt('> ');
console.clear();
console.log(chalk.green(logo2))
console.log(chalk.bgGreen("\n[WORKER] Starting setup"))
console.log(chalk.bgGreen("\n[WORKER] checking if folder img exists"))
createDirIfNotExists('img');
console.log(chalk.bgGreen("\n[WORKER] check completed"))
console.log(chalk.bgGreen("\n[WORKER] starting service"))
imgParser(amount,"./img",2000,)
console.log(chalk.bgGreen("\n[WORKER] Sucessfully started"))

const { default: { stream } } = require("got");
const chalk = require("chalk")
const { createWriteStream } = require("fs"); 
const { execSync } = require("child_process");
const url = "https://github.com/freyacodes/Lavalink/releases/download/3.5.1/Lavalink.jar"; // This will always pull the latest with soundcloud fix ect ect
const start = () => {
    const download = stream(url).pipe(createWriteStream('Lavalink.jar'));
    download.on("finish", () => {
        execSync("java -jar Lavalink.jar", { stdio: "inherit" });
    });
};

    console.log(chalk.hex('#F4FF08').bold(`
     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃      
     
     ┃

     ┃ Iniciando lavalink ...          
     
     ┃

     ┃                                                                  ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`));

start();
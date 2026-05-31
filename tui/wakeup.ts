import {select, isCancel} from "@clack/prompts";
import chalk from "chalk"
import figlet from "figlet";
import { log } from "node:console";
import { runCliMode } from "../modes/cli";

const BANNER_Font = "ANSI Shadow"
const SHADOW = chalk.hex ('#00F5D4')
const FACE = chalk.hex('#9D4EDD').bold;

function printBannerWithShadow(ascii: string){
    const bannerLines = ascii.replace(/\s+$/, '').split('\n');
    const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
    const rowWidth = maxLen+2

    for (const line of bannerLines) { 
        console.log(SHADOW(('   ' + line).padEnd(rowWidth)));
    }

    process.stdout.write(`\x1b[${bannerLines.length}A`);
    for (const line of bannerLines) {
        console.log(FACE(line.padEnd(rowWidth)));
    }
    console.log();
    
}

export async function runWakeup(){
    let ascii : string;
    try{
        ascii = figlet.textSync("unitcode", {font:BANNER_Font})
    } catch (error) {
        ascii = figlet.textSync("unitcode", {font : "Standard"})
    }

    printBannerWithShadow(ascii)

    const mode = await select ({
        message : "Which mode do you want to proceed with?",
        options : [
            {value : 'cli', label : 'CLI'},
            {value : "telegram", label : "Telegram"},
            {value : "exit", label : "Exit"}
        ]
    });

    if (isCancel(mode || mode == "exit")){
        console.log(chalk.dim("\nShutting Down UNITCODE zZzZzzZ . . . \n"))
        return;
    }

    if (mode === 'cli'){
        await runCliMode()
        
    }

    if (mode === 'telegram'){
        console.log(chalk.dim("Initialising Telegram mode . . ."));
        
    }
}



import inquirer from 'inquirer';
import process from 'process';
import path from 'path';

async function getWebAppMapUrl(){
    const answer = await inquirer.prompt({
        name: 'srcMapUrl',
        type: 'input',
        message: '[+] app.js.map URL:'
    })

    return answer.srcMapUrl;
}

async function getOutputDirPath(){
    const answer = await inquirer.prompt({
        name: 'outputDirPath',
        type: 'input',
        message: '[+] cloned source code output directory:',
        default: path.join(process.cwd(),'cloned-web-apps')
    });
    return answer.outputDirPath;
}
export {
    getWebAppMapUrl,
    getOutputDirPath
}
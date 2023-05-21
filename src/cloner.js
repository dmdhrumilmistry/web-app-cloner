import sourceMap from 'source-map';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';


async function fetchSourceMap(srcMapUrl) {
    // app.js.map is a complete package contains all the js and css files
    const res = await fetch(srcMapUrl);
    if (res.status === 200) {
        const srcMap = await res.json();
        return srcMap;
    }
    console.log(chalk.red.bold(`Failed to fetch Source Map returned HTTP status code ${res.status}`));
    const err = await res.text();
    return err;
}


async function saveFile(filePath, content) {
    let errors = 0;
    let facedError = false;
    try {
        if (!fs.existsSync(filePath)) {
            await fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        // write data to file
        fs.writeFileSync(filePath, content);

    } catch (err) {
        facedError = true;
        console.log(chalk.red.bold(err));
        errors += 1;
    } finally {
        if (facedError) {
            console.log(chalk.red.bold(`[❌] faced Error while writing file: ${filePath}`));
        } else {
            console.log(chalk.greenBright(`[✓] ${filePath}`));
        }
    }

    return errors;
}


async function saveSrcMapToDir(srcMap, outputDirPath) {
    sourceMap.SourceMapConsumer.with(srcMap, null, async consumer => {
        console.log(`Saving ${consumer.sources.length} files to ${outputDirPath}`);

        for (const source of consumer.sources) {
            let content = consumer.sourceContentFor(source);
            if (content === null) {
                const url = new URL(source, sourceMapURL)
                content = await fetch(url).then(res => res.blob())
                console.log(chalk.blue(`${source} src content was not found so fetched content from ${url}`));
            }

            // sanitize file path
            const filePath = path.join(outputDirPath, source.split('webpack://')[1]);
            // exit(1);
            await saveFile(filePath, content);
        }

    })
}


async function cloneWebApp(srcMapUrl, outputDirPath) {
    const srcMap = await fetchSourceMap(srcMapUrl);
    const totalErrors = await saveSrcMapToDir(srcMap, outputDirPath);

    console.log(chalk.bgRed(`Total Errors: ${totalErrors}`));
}

export {cloneWebApp};

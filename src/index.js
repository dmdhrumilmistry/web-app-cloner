const sourceMap = require('source-map');
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');


async function fetchSourceMap(srcMapUrl) {
    // app.js.map is a complete package contains all the js and css files
    const res = await fetch(srcMapUrl);
    if (res.status === 200) {
        const srcMap = await res.json();
        return srcMap;
    }
    console.error(`Failed to fetch Source Map returned HTTP status code ${res.status}`);
    const err = await res.text();
    return err;
}


async function saveFile(filePath, content) {
    let facedError = false;
    try {
        if (!fs.existsSync(filePath)) {
            await fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        
        // write data to file
        fs.writeFileSync(filePath, content);

    } catch (err) {
        facedError = true;
        console.error(err);
    } finally {
        if (facedError) {
            console.error(`faced Error while writing file: ${filePath}`)
        } else {
            console.log(`wrote data to file: ${filePath}`);
        }
    }
}


async function saveSrcMapToDir(srcMap, outputDirPath) {
    sourceMap.SourceMapConsumer.with(srcMap, null, async consumer => {
        console.log(`Saving ${consumer.sources.length} files to ${outputDirPath}`);

        for (const source of consumer.sources) {
            let content = consumer.sourceContentFor(source);
            if (content === null) {
                const url = new URL(source, sourceMapURL)
                content = await fetch(url).then(res => res.blob())
                console.log(`${source} src content was not found so fetched content from ${url}`)
            }

            // sanitize file path
            const filePath = path.join(outputDirPath, source.split('webpack://')[1]);
            // exit(1);
            await saveFile(filePath, content);
        }

    })
}


async function cloneReactApp(srcMapUrl, outputDirPath) {
    const srcMap = await fetchSourceMap(srcMapUrl);
    const status = await saveSrcMapToDir(srcMap, outputDirPath)
    console.log(status);

    // if (status === true) {
    // console.log(`Source Code successfully saved to ${outputDirPath}`)
    // } else {
    // console.error(`Error occurred while saving source code to ${outputDirPath}`)
    // }
}

// Google Dork: ext:map intext:react inurl:app.js.map
const srcMapUrl = "https://iam.innogy.com/js/innogy/app.js.map";
const outputDirPath = path.join(cwd(), 'temp');

cloneReactApp(srcMapUrl, outputDirPath);
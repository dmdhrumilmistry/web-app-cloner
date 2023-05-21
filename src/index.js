#!/usr/bin/env node
import { cloneWebApp } from './cloner.js';
import { getWebAppMapUrl, getOutputDirPath} from './utils.js'


// Google Dork: ext:map intext:react inurl:app.js.map
// const srcMapUrl = "https://iam.innogy.com/js/innogy/app.js.map";
const srcMapUrl = await getWebAppMapUrl();
const outputDirPath = await getOutputDirPath();

cloneWebApp(srcMapUrl, outputDirPath);
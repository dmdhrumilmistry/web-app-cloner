#!/usr/bin/env node
import { cloneWebApp } from './cloner.js'
// Google Dork: ext:map intext:react inurl:app.js.map
const srcMapUrl = "https://iam.innogy.com/js/innogy/app.js.map";
// const outputDirPath = path.join(process.cwd(), 'temp');
const outputDirPath = 'D:\\GithubRepos\\web-app-cloner\\temp';

cloneWebApp(srcMapUrl, outputDirPath);
import path from 'path';

let _uuidCounter = 0;
export function uuid() {
    return `plugin-chart-${++_uuidCounter}`;
};


const PKG = require('../package.json');
export function assetsTag (staticBase, fileName) {
    let filePath = `${staticBase}/plugins/${PKG.name}/${fileName}`;
    switch (path.extname(fileName)) {
        case '.js':
            return `<script src="${filePath}"></script>`;
        case '.css':
            return `<link rel="stylesheet" href="${filePath}">`;
        default:
            return '';
    }
};


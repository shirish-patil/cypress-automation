const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
    on('task', {
        getPdfFileName() {
            const fixturesDir = path.join(__dirname, '../fixtures');
            const files = fs.readdirSync(fixturesDir);
            const pdfFile = files.find(file => file.endsWith('.pdf'));
            
            if (!pdfFile) {
                throw new Error('No PDF file found in fixtures directory');
            }
            
            return pdfFile;
        }
    });
}; 
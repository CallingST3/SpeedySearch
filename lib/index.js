const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadReleaseAsset(owner, repo, assetName) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
        const latestRelease = response.data;

        const asset = latestRelease.assets.find((a) => a.name === assetName);

        if (!asset) {
            throw new Error(`Asset '${assetName}' not found in the latest release.`);
        }

        const packageDir = __dirname;

        const destinationPath = path.join(packageDir, assetName);

        const assetContentResponse = await axios.get(asset.browser_download_url, { responseType: 'arraybuffer' });

        fs.writeFileSync(destinationPath, Buffer.from(assetContentResponse.data));

        console.log(`Downloaded '${assetName}' from ${owner}/${repo} to ${destinationPath}`);
    } catch (error) {
        console.error('Error downloading release asset:', error.message);
    }
}

function search(query) {
    const filePath = path.join(__dirname, 'ssearch.json');
    const searchData = fs.readFileSync(filePath, 'utf8');

    let jsonData;
    try {
        jsonData = JSON.parse(searchData);
    } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return 'Error processing data';
    }

    if (!jsonData.hasOwnProperty('websites') || !Array.isArray(jsonData.websites)) {
        console.error('Invalid JSON format. Missing "websites" array.');
        return 'Error processing data';
    }

    const data = jsonData.websites;

    const keywords = query.toLowerCase().split(' ');

    const filteredResults = data.filter(item => {
        const lowercasedTitle = item.title.toLowerCase();
        return keywords.some(keyword => lowercasedTitle.includes(keyword));
    });

    if (filteredResults.length === 0) {
        console.log('No matching results. Full data:', data);
    }

    filteredResults.sort((a, b) => {
        const keywordsInA = keywords.filter(keyword => a.title.toLowerCase().includes(keyword)).length;
        const keywordsInB = keywords.filter(keyword => b.title.toLowerCase().includes(keyword)).length;
        return keywordsInB - keywordsInA;
    });

    return filteredResults;
}

async function setup() {
    const owner = 'ssearch-e';
    const repo = 'indexed';
    const assetName = 'ssearch.json';
    const destinationPath = 'ssearch.json';
  
    await downloadReleaseAsset(owner, repo, assetName, destinationPath);
}

module.exports = {
    search,
    setup
};

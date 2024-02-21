 # SSearch - NodeJS Search Engine Package

## Example

Run a example without downloading the package here: https://codesandbox.io/p/devbox/testssearchpackageonline-qx7znz

 ## Installation

 ```bash
 npm install ssearch
 ```

 ## Usage

 ```javascript
 const ssearch = require('ssearch');

  // Setup: Downloads the required file (ssearch.json)
 ssearch.setup();

  // Wait for the setup to complete (timeout is 2000 milliseconds)
 setTimeout(function() {
      // Search for "Youtube" in the indexed data
     const searchResults = ssearch.search("Youtube");
     console.log(searchResults);
 }, 2000);
 ```

*Note: The timeout is necessary because the setup function is downloading a file asynchronously.*

## API

### `ssearch.setup()`

 Downloads the required file (ssearch.json) for indexing. This function should be run before performing any searches.

### `ssearch.search(query)`

Performs a search based on the specified query. The function returns an array of results matching the query.

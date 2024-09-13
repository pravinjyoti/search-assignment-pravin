# SearchStax Demo

## Usage
- Clone this repository
- Change the configuration 
- Run the commands:

```js
   $ cd search-assignment-original
   $ npm install
   $ npm run dev
```

- Open [http://localhost:3000/]

## Configuration
```js
  const config = {
  searchURL: "<search_api_url>",
  suggesterURL: "<suggester_api_url>",
  trackApiKey: "<analytics_write_key>", 
  searchAuth: "<base64_encoded_api_key>:"   
}
```

## SearchStax Widgets
- The main JavaScript file `src/App.txs` imports and initializes several widgets from the `@searchstax-inc/searchstudio-ux-js` library. These widgets add search functionality to the web application.
- `SearchstaxInputWidget` - Renders the search input
- `SearchstaxResultWidget` - Renders search results
- `SearchstaxFacetsWidget` - Renders faceted filters
- `SearchstaxPaginationWidget` - Renders pagination control
  


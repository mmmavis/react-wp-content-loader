# React WP Content Loader

**(NOTICE: This is still at its early development stage)**


## What does this do?

It uses [WordPress.com's REST API](https://developer.wordpress.com/docs/api/) to get information of a WordPress Post and renders the content on the app that uses this `react-wp-content-loader` module.


## How to install it as a dependencies?

- in `package.json` of your app, add `"react-wp-content-loader": "git://github.com/mmmavis/react-wp-content-loader.git"` as the `dependencies`
For example,
```
{
  "name": "name-of-your-app",
  "dependencies": {
  ...
  "react-wp-content-loader": "git://github.com/mmmavis/react-wp-content-loader.git"
  ...
  }
}
```
- run `npm install react-wp-content-loader`


## How to use it?
- `require` (or `import`) the this module, and make sure you pass the 2 required `prop` `wpUrl` and `wpPostSlug` to the React component.

For example,
```
var React = require('react');
var WpContentLoader = require('react-wp-content-loader');

var Homepage = React.createClass({
  render: function () {
    return (
      <div>
        <WpContentLoader wpUrl="url-to-your-wordpress-com-site" 
                         wpPostSlug="the-slug-of-the-wordpress-post" />
      </div>
    );
  }
});

module.exports = Homepage;
```

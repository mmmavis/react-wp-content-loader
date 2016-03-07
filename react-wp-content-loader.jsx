import React from 'react';
import request from 'superagent';

const WORDPRESS_COM_API_ENDPOINT_BASE = `https://public-api.wordpress.com/rest/v1.1/sites/`;

var ReactWpContentLoader = React.createClass({
  wpApiEndpoint: null,
  propTypes: {
    wpUrl: React.PropTypes.string.isRequired,
    wpPostSlug: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      hasLoaded: false,
      failedToLoad: false
    };
  },
  componentDidMount: function() {
    this.wpApiEndpoint = WORDPRESS_COM_API_ENDPOINT_BASE + this.props.wpUrl + `/posts/slug:` + this.props.wpPostSlug;
    console.log(`/// this.wpApiEndpoint = `, this.wpApiEndpoint);
    this.getContent();
  },
  getContent: function() {
    request
      .get(this.wpApiEndpoint)
      .accept(`json`)
      .end((err, res) => {
        console.log(`res`, res);
        if ( err || res.statusCode !== 200 ) {
          console.log(`error: `, err);
          this.content = `Oops, unable to load Wordpress post.`;
          this.setState({failedToLoad: true});
        } else {
          this.content = JSON.parse(res.text).content;
        }
        this.setState({hasLoaded: true});
      });
  },
  render: function() {
    var classname = this.state.failedToLoad ? `error` : ``;

    return (
      <div>
        { this.state.hasLoaded ?
          <div className={classname} dangerouslySetInnerHTML={{__html: this.content}} />
          : <p>Loading...</p>
        }
      </div>
    );
  }
});

module.exports = ReactWpContentLoader;

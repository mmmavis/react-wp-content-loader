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
    console.log(`[react-wp-content-loader] wpApiEndpoint = `, this.wpApiEndpoint);
    this.getContent();
  },
  getContent: function() {
    request
      .get(this.wpApiEndpoint)
      .accept(`json`)
      .end((err, res) => {
        console.log(`[react-wp-content-loader] wp-api response`, res);
        if ( err || res.statusCode !== 200 ) {
          console.log(`[react-wp-content-loader] error: `, err);
          this.setState({failedToLoad: true});
        } else {
          this.content = JSON.parse(res.text).content;
        }
        this.setState({hasLoaded: true});
      });
  },
  render: function() {
    var classname = ``;
    var content = `Loading...`;
    var errorMessage = `Oops, unable to load Wordpress post.`;

    if ( this.state.hasLoaded ) {
      content = this.content;
      classname = `content`;
    }

    if ( this.state.failedToLoad ) {
      console.log(this.props.children);
      errorMessage = this.props.children ? this.props.children : errorMessage;
      classname = `error`;
    }

    return (
      <div className="wp-content">
        <div className={classname}>
          { this.state.failedToLoad ? <div>{errorMessage}</div>
                                    : <div dangerouslySetInnerHTML={{__html: content}} />
          }
        </div>
      </div>
    );
  }
});

module.exports = ReactWpContentLoader;

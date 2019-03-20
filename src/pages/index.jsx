import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

class IndexRoute extends React.Component {
  render() {
    const items = [];
    const { title, subtitle } = this.props.data.site.siteMetadata;
    const posts = this.props.data.allMarkdownRemark.edges;
    posts.forEach((post) => {
      items.push(<Post data={post} key={post.node.fields.slug} />);
    });

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={subtitle} />
        </Helmet>
        {/* <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            {items}
          </div>
        </div> */}
        <div className="protofi-container">
          <div id="wrapper">
            <div id="main">
              <div className="inner">
                <div id="image01" className="image">
                  <img
                    src="https://avatars2.githubusercontent.com/u/10678334?s=460&v=4"
                    alt="Alex"
                  />
                </div>
                <h1 id="text01">X. Pearson</h1>
                <hr id="divider01" />
                <p id="text02">
                  Web Engineer in <a href="#">Nan jing</a>, passionate about high performance
                  progressive web apps and developer experience with{' '}
                  <a href="https://reactjs.org/">React</a> and <a href="https://vuejs.org/">Vue</a>.
                  Currently working on <a href="https://d3js.org">D3</a> Data Visiulization.
                </p>
                <ul id="icons01" className="icons">
                  <li>
                    <a className="n02" href="https://twitter.com/lirawx">
                      <i className="icon-twitter" />
                      <span className="label">Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a className="n02" href="https://github.com/lirawx">
                      <i className="icon-github" />
                      <span className="label">GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a className="n02" href="mailto:i@lirawx.cn">
                      <i className="icon-mail" />
                      <span className="label">Email</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexRoute;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

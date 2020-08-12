const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value: `/blog${value}`
    });
  }
};

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter
}) => {
  const { errors, data } = await graphql(`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for createPages`);
    return;
  }

  createPage({
    path: '/',
    component: path.resolve(`./src/templates/blog/Archive.tsx`)
  });

  const { edges: posts } = data.allMdx;
  posts.forEach(({ node: { id, fields } }, index) => {
    const { slug } = fields;
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/blog/Post.tsx`),
      context: {
        id,
        slug,
        previous: index === posts.length - 1 ? null : posts[index + 1].node,
        next: index === 0 ? null : posts[index - 1].node
      }
    });
  });
};

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    resolve: {
      modules: ['node_modules', 'src']
    }
  });
};

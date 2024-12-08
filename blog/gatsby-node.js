const path = require('path');

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allContentfulPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  result.data.allContentfulPost.edges.forEach((edge) => {
    createPage({
      path: edge.node.slug,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        slug: edge.node.slug,
      },
    });
  });
};

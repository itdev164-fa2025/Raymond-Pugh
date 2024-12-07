const path = require('path');

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  
  try {
    const result = await graphql(`
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);

    // Check if there were errors in the query response
    if (result.errors) {
      console.error('Error fetching blog posts:', result.errors);
      // You can return early if you want to prevent further execution
      return;
    }

    // Check if the data is available before proceeding
    if (!result.data.allContentfulBlogPost || !result.data.allContentfulBlogPost.edges) {
      console.warn('No blog posts found.');
      return;
    }

    // Iterate over the fetched blog posts and create pages
    result.data.allContentfulBlogPost.edges.forEach((edge) => {
      createPage({
        path: edge.node.slug,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {
          slug: edge.node.slug,
        },
      });
    });
    
  } catch (error) {
    console.error('Error in createPages API:', error);
  }
};

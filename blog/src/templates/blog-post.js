import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const BlogPost = ({ data }) => {
  const { title, body } = data.contentfulPost;

  return (
    <Layout>
      <h1>{title}</h1>
      <div>
        {body?.childMarkdownRemark?.html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: body.childMarkdownRemark.html,
            }}
          ></div>
        ) : (
          <p>Content not available.</p>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

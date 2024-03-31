/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { WholePage } from "./commonStyles";

import Header from "./header";

interface LayoutProps {
  currentPage?: string;
  children: React.ReactNode;
}

export default function Layout({
  currentPage = "",
  children,
}: LayoutProps) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <Header
        currentPage={currentPage}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <div id="gap">
        <WholePage>
          {children}

          <footer className="page-footer go-center">
            © {new Date().getFullYear()} Maria Mateescu, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </WholePage>
      </div>
    </>
  );
}

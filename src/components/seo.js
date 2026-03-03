/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, keywords, title, pathname, image, type }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description
    const metaType = type || `website`
    const url = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

    const metaTags = [
        {
            name: `description`,
            content: metaDescription,
        },
        {
            property: `og:title`,
            content: title,
        },
        {
            property: `og:description`,
            content: metaDescription,
        },
        {
            property: `og:type`,
            content: metaType,
        },
    ]
        .concat(
            url
                ? [
                      {
                          property: `og:url`,
                          content: url,
                      },
                  ]
                : []
        )
        .concat([
            {
                name: `twitter:card`,
                content: `summary`,
            },
            {
                name: `twitter:creator`,
                content: site.siteMetadata.author,
            },
            {
                name: `twitter:title`,
                content: title,
            },
            {
                name: `twitter:description`,
                content: metaDescription,
            },
        ])
        .concat(
            image
                ? [
                      {
                          property: `og:image`,
                          content: image,
                      },
                      {
                          name: `twitter:image`,
                          content: image,
                      },
                  ]
                : []
        )
        .concat(
            keywords.length > 0
                ? [
                      {
                          name: `keywords`,
                          content: keywords.join(`, `),
                      },
                  ]
                : []
        )
        .concat(meta)

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            link={
                url
                    ? [
                          {
                              rel: `canonical`,
                              href: url,
                          },
                      ]
                    : []
            }
            meta={metaTags}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    keywords: [],
    type: `website`,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    pathname: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
}

export default SEO

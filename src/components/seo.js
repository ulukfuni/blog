/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
    description,
    lang,
    meta,
    keywords,
    title,
    pathname,
    image,
    type,
    jsonLd,
}) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                        social {
                            twitter
                        }
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description
    const metaType = type || `website`
    const url = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
    const twitterHandle = site.siteMetadata.social.twitter
        ? `@${site.siteMetadata.social.twitter}`
        : site.siteMetadata.author

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
                content: image ? `summary_large_image` : `summary`,
            },
            {
                name: `twitter:creator`,
                content: twitterHandle,
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

    const links = []
    if (url) {
        links.push({
            rel: `canonical`,
            href: url,
        })
    }
    links.push({
        rel: `alternate`,
        type: `application/rss+xml`,
        title: `${site.siteMetadata.title} RSS Feed`,
        href: `${site.siteMetadata.siteUrl}/rss.xml`,
    })

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            link={links}
            meta={metaTags}
        >
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
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
    jsonLd: PropTypes.object,
}

export default SEO

/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import SocialIcons from "../constants/social"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { rhythm } from "../utils/typography"

function Bio() {
    const data = useStaticQuery(graphql`
        query BioQuery {
            avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
                childImageSharp {
                    gatsbyImageData(
                        width: 50
                        height: 50
                        layout: FIXED
                    )
                }
            }
            site {
                siteMetadata {
                    author
                    social {
                        twitter
                    }
                }
            }
        }
    `)

    const { author } = data.site.siteMetadata
    return (
        <div
            style={{
                marginBottom: rhythm(2.5),
            }}
        >
            <div style={{ display: "flex", flexDirection: "row" }}>
                <GatsbyImage
                    image={data.avatar.childImageSharp.gatsbyImageData}
                    alt={author}
                    style={{
                        marginRight: rhythm(1 / 2),
                        marginBottom: 0,
                        minWidth: 50,
                        borderRadius: `100%`,
                    }}
                    imgStyle={{
                        borderRadius: `50%`,
                    }}
                />
                <p style={{ marginBottom: 0 }}>
                    Written by <strong>{author}</strong>. Senior Software Engineer residing in Orlando, FL.
                    <Link to="/now" style={{ marginLeft: rhythm(1/4)}}>What I'm Doing Now</Link> 
                </p>
            </div>
            <div
                className="icon-container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: rhythm(2.25),
                    marginTop: rhythm(1 / 2),
                }}
            >
                <ul style={{ listStyleType: "none" }}>
                    {SocialIcons.map(s => (
                        <li
                            key={s.kind}
                            style={{
                                display: "inline-block",
                                marginRight: rhythm(1.5),
                            }}
                        >
                            <a
                                style={{ boxShadow: "none" }}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={s.icon}
                                    color="var(--gray)"
                                    title={`Link to my ${s.kind}`}
                                    style={{ fontSize: "30px" }}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Bio

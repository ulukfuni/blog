/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import SocialIcons from "../constants/social"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { rhythm } from "../utils/typography"

function Bio() {
    return (
        <StaticQuery
            query={bioQuery}
            render={data => {
                const { author } = data.site.siteMetadata
                return (
                    <div
                        style={{
                            marginBottom: rhythm(2.5),
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Image
                                fixed={data.avatar.childImageSharp.fixed}
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
                                Written by <strong>{author}</strong>. Full Stack Web Developer residing in Orlando, Florida.
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
                                        <OutboundLink
                                            style = {{ boxShadow: "none" }}
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
                                        </OutboundLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }}
        />
    )
}

const bioQuery = graphql`
    query BioQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
                fixed(width: 50, height: 50) {
                    ...GatsbyImageSharpFixed
                }
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
`

export default Bio

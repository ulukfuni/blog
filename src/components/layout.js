import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

function Layout({ location, title, children }) {
    const rootPath = `${__PATH_PREFIX__}/`
    const isRoot = location.pathname === rootPath
    let header

    if (isRoot) {
        header = (
            <h1
                style={{
                    ...scale(1.5),
                    marginBottom: rhythm(1.5),
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                    to={`/`}
                >
                    {title}
                </Link>
            </h1>
        )
    } else {
        header = (
            <h3
                style={{
                    fontFamily: `Montserrat, sans-serif`,
                    marginTop: 0,
                    marginBottom: rhythm(1 / 2),
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                    to={`/`}
                >
                    {title}
                </Link>
            </h3>
        )
    }
    return (
        <div
            style={{
                marginLeft: `auto`,
                marginRight: `auto`,
                maxWidth: rhythm(24),
                padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
        >
            <header>
                <nav
                    style={{
                        ...scale(-1 / 5),
                        display: `flex`,
                        justifyContent: `flex-end`,
                        marginBottom: rhythm(1 / 2),
                    }}
                >
                    <Link to="/now" style={{ marginRight: rhythm(1 / 2) }}>
                        Now
                    </Link>
                    <Link to="/work" style={{ marginRight: rhythm(1 / 2) }}>
                        Work
                    </Link>
                    <a href="/rss.xml">RSS</a>
                </nav>
                {header}
            </header>
            <main>{children}</main>
            <footer>
                © {new Date().getFullYear()} {` `}
                <Link to="/">The Life I Live</Link>
                {` · `}
                <Link to="/now">Now</Link>
                {` · `}
                <Link to="/work">Work</Link>
                {` · `}
                <a href="/rss.xml">RSS</a>
            </footer>
        </div>
    )
}

export default Layout

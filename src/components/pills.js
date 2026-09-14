import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { rhythm } from "../utils/typography"
import { categorySlug } from "../utils/posts"

const style = {
    pill: {
        backgroundColor: "black",
        color: "white",
        fontSize: ".7rem",
        borderRadius: ".9375rem",
        padding: "0 .5rem",
        marginRight: rhythm(1 / 4),
        marginBottom: rhythm(1 / 4),
        textTransform: "capitalize",
        boxShadow: "none",
        textDecoration: "none",
        display: "inline-block",
        lineHeight: "1.5rem",
    },
}

const Pills = props => (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {props.items.filter(Boolean).map((item, i) => {
            const slug = categorySlug(item)
            return (
                <Link
                    key={`${slug}-${i}`}
                    to={`/category/${slug}/`}
                    style={style.pill}
                >
                    {item}
                </Link>
            )
        })}
    </div>
)

Pills.defaultProps = {
    items: [],
}

Pills.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
}

export default Pills

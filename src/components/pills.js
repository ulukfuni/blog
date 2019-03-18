import React from "react"
import { rhythm } from "../utils/typography"
import PropTypes from "prop-types"

const style = {
    pill: {
        backgroundColor: "black",
        color: "white",
        fontSize: ".7rem",
        borderRadius: ".9375rem",
        padding: "0 .5rem",
        marginRight: rhythm(1 / 4),
        textTransform: "capitalize",
    },
}

const Pills = props => (
    <div style={{ display: "flex", flexDirection: "row" }}>
        {props.items.map((item, i) => (
            <span key={i} style={style.pill}>
                {item}
            </span>
        ))}
    </div>
)

Pills.defaultProps = {
    items: [],
}

Pills.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
}

export default Pills

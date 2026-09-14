const NOW_SLUG = `/now/`

function categorySlug(name) {
    return String(name || ``)
        .trim()
        .toLowerCase()
}

function isNowSlug(slug) {
    return slug === NOW_SLUG
}

function isDraft(frontmatter) {
    return Boolean(frontmatter && frontmatter.draft)
}

function isListedPost(node) {
    if (!node || isNowSlug(node.fields && node.fields.slug)) {
        return false
    }
    if (isDraft(node.frontmatter)) {
        return false
    }
    return true
}

module.exports = {
    NOW_SLUG,
    categorySlug,
    isNowSlug,
    isDraft,
    isListedPost,
}

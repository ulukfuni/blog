const NOW_SLUG = `/now/`
const WORK_SLUG = `/work/`

function categorySlug(name) {
    return String(name || ``)
        .trim()
        .toLowerCase()
}

function isNowSlug(slug) {
    return slug === NOW_SLUG
}

function isWorkSlug(slug) {
    return slug === WORK_SLUG
}

function isStandalonePageSlug(slug) {
    return isNowSlug(slug) || isWorkSlug(slug)
}

function isDraft(frontmatter) {
    return Boolean(frontmatter && frontmatter.draft)
}

function isListedPost(node) {
    if (!node || isStandalonePageSlug(node.fields && node.fields.slug)) {
        return false
    }
    if (isDraft(node.frontmatter)) {
        return false
    }
    return true
}

module.exports = {
    NOW_SLUG,
    WORK_SLUG,
    categorySlug,
    isNowSlug,
    isWorkSlug,
    isStandalonePageSlug,
    isDraft,
    isListedPost,
}

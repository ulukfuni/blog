const path = require(`path`)
const fs = require(`fs`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const {
    categorySlug,
    isNowSlug,
    isWorkSlug,
    isDraft,
    isListedPost,
} = require(`./src/utils/posts`)

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
        type MarkdownRemarkFrontmatter {
            title: String
            date: Date @dateformat
            description: String
            categories: [String]
            keywords: [String]
            draft: Boolean
        }
    `)
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const nowTemplate = path.resolve(`./src/templates/now.js`)
    const workTemplate = path.resolve(`./src/templates/work.js`)
    const categoryTemplate = path.resolve(`./src/templates/category.js`)

    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { frontmatter: { date: DESC } }
                limit: 1000
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 160)
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date(formatString: "YYYY-MM-DD")
                            description
                            categories
                            keywords
                            draft
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges
    const includeDraftPages = process.env.NODE_ENV !== `production`
    const sequenced = posts.filter(({ node }) => isListedPost(node))

    posts.forEach(({ node }) => {
        if (isNowSlug(node.fields.slug)) {
            createPage({
                path: node.fields.slug,
                component: nowTemplate,
                context: {
                    slug: node.fields.slug,
                },
            })
            return
        }

        if (isWorkSlug(node.fields.slug)) {
            createPage({
                path: node.fields.slug,
                component: workTemplate,
                context: {
                    slug: node.fields.slug,
                },
            })
            return
        }

        if (isDraft(node.frontmatter) && !includeDraftPages) {
            return
        }

        const index = sequenced.findIndex(
            p => p.node.fields.slug === node.fields.slug
        )
        const previous =
            index === -1 || index === sequenced.length - 1
                ? null
                : sequenced[index + 1].node
        const next = index <= 0 ? null : sequenced[index - 1].node

        createPage({
            path: node.fields.slug,
            component: blogPost,
            context: {
                slug: node.fields.slug,
                previous,
                next,
            },
        })
    })

    const categories = new Set()
    sequenced.forEach(({ node }) => {
        ;(node.frontmatter.categories || []).forEach(name => {
            const key = categorySlug(name)
            if (key) {
                categories.add(key)
            }
        })
    })

    categories.forEach(category => {
        createPage({
            path: `/category/${category}/`,
            component: categoryTemplate,
            context: { category },
        })
    })

    writePostsIndex(posts)
}

exports.onPostBuild = async ({ graphql }) => {
    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { frontmatter: { date: DESC } }
                limit: 1000
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 160)
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date(formatString: "YYYY-MM-DD")
                            description
                            categories
                            keywords
                            draft
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        throw result.errors
    }

    writePostsIndex(result.data.allMarkdownRemark.edges)
}

function writePostsIndex(posts) {
    const payload = posts.filter(({ node }) => isListedPost(node)).map(
        ({ node }) => ({
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            categories: (node.frontmatter.categories || []).filter(Boolean),
            description: node.frontmatter.description || node.excerpt,
            keywords: node.frontmatter.keywords || [],
        })
    )

    const publicDir = path.join(__dirname, `public`)
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true })
    }
    const outPath = path.join(publicDir, `posts.json`)
    if (fs.existsSync(outPath) && fs.statSync(outPath).isDirectory()) {
        fs.rmSync(outPath, { recursive: true, force: true })
    }
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}

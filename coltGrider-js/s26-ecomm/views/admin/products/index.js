const layout = require('../layout');

// Receive an object with all the product properties inside of it
module.exports = ({ products }) => {
    // Iterate through the list of products. For every product, we will return a snippet of html
    // Take each of these individual html snippets and join it into one string using .join() method
    const renderedProducts = products.map((product) => {
        return `
            <div>${product.title}</div>
        `;
    }).join('');

    // Render the layout
    // Pass in an object with content property
    return layout({
        content: `
            <h1 class="title">Products</h1>
            ${renderedProducts}
        `
    })
}
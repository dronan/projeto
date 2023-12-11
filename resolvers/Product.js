module.exports = {
    priceWithDiscount(product) {
        if (!product.discount) return product.price
        return product.price * (1 - product.discount)
    }
}
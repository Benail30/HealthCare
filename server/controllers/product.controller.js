const prisma = require('../models/prisma');

const getAllproducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

const getproductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}

const createproduct = async (req, res) => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
}
const updateproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'product not found' });
        } else {
            res.status(500).json({ error: 'Failed to update product' });
        }
    }
}

const deleteproduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'product not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
}

module.exports = {
    getAllproducts,
    createproduct,
    getproductById,
    updateproduct,
    deleteproduct

}

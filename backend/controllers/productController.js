import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await productModel.find().skip(skip).limit(limit);
        const total = await productModel.countDocuments();

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total,
            data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};

// function for removing product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listProductsFilter = async (req, res) => {
    try {
        let { category, subcategory, page = 1, limit = 10 } = req.body;

        const filter = {};

        if (Array.isArray(category) && category.length > 0) {
            filter.category = { $in: category };
        }

        // normalize subcategory to array
        if (Array.isArray(subcategory) && subcategory.length > 0) {
            filter.subCategory = { $in: subcategory };
        }

        console.log("Applied filter:", filter);

        const skip = (page - 1) * limit;

        const products = await productModel
            .find(filter)
            .sort({ createdAt: -1, _id: -1 })
            .skip(skip)
            .limit(limit);

        const total = await productModel.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};


const listProductsSort = async (req, res) => {
    try {
        const { category, subcategory, sort, order } = req.body;

        const filter = {};

        // Only apply filter if category is provided and is a non-empty array
        if (Array.isArray(category) && category.length > 0) {
            filter.category = { $in: category };
        }

        // Only apply filter if subcategory is provided and is a non-empty array
        if (Array.isArray(subcategory) && subcategory.length > 0) {
            filter.subcategory = { $in: subcategory };
        }

        // Sort setup
        let sortOptions = {};
        if (sort && typeof sort === "string") {
            const sortOrder = order === "desc" ? -1 : 1;
            sortOptions[sort] = sortOrder;
        }

        // Apply filter + sort
        const products = await productModel.find(filter).sort(sortOptions);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};


export { listProducts, addProduct, removeProduct, singleProduct, listProductsFilter, listProductsSort }
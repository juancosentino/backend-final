const ProductsModel = require("../models/products.schema")
const cloudinary = require('../helpers/clodinary')

const createProduct = async (req, res) => {
    try {
        const { titulo, precio, descripcion, destacado, categoria } = req.body;

        // Verificar que los campos obligatorios no estén vacíos
        if (!titulo || !precio || !descripcion ||!destacado || !categoria){
            return res.status(400).json({ msg: 'Algun campo está vacío' });
        }

        // Verificar si se ha cargado una imagen
        if (!req.file) {
            return res.status(400).json({ msg: 'Debes subir una imagen' });
        }

        // Subir la imagen a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path);

        // Crear un nuevo producto con la URL de la imagen en Cloudinary
        const newProduct = new ProductsModel({
            titulo,
            precio,
            imagen: uploadResult.secure_url,
            descripcion,
            destacado,
            categoria,
        });

        // Guardar el nuevo producto en la base de datos
        await newProduct.save();

        res.status(201).json({ msg: 'Producto creado con éxito', newProduct });
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Falla en el servidor', error });
    }
};

const getProduct = async(req, res) => {
    try{
        const getAllProducts = await ProductsModel.find()
        res.status(200).json({msg: 'Productos encontrados', getAllProducts})

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const getOneProduct = async(req, res) => {
    try{
        const getProduct = await ProductsModel.findOne({_id: req.params.id})
        res.status(200).json({msg: 'Producto encontrado', getProduct}) 

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const updateProduct = async(req, res) => {
    try {
        
       const updateProduct = await ProductsModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
       res.status(200).json({msg: 'Producto actualizado', updateProduct})

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

const deleteProduct = async(req, res) => {
    try {
        
        const productExist = await ProductsModel.findOne({_id: req.params.id})

        if(!productExist){
            res.status(400).json({msg: 'El producto que intentas borrar no existe'}) 
        }

        await ProductsModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: 'Producto eliminado'}) 

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error})
    }
}

module.exports = {
    createProduct,
    getProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}
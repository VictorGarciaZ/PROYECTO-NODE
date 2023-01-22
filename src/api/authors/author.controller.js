const Author = require("./Author.model");

const indexGet = async (req, res, next) => {
    try {
        const Authors = await Author.find();
        return res.status(200).json(Authors);
    } catch(error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Author.findById(id);
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};
const getByName = async (req, res, next) => {
    try {
        // recogemos el id de los parámetros de la petición -> req -> request
        const { name } = req.params;
        const found = await Author.find({name: name});
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};
const createPost = async (req, res, next) => {
    try {
        console.log(req.body);

        const AuthorToBeCreated = new Author(req.body);

        const created = await AuthorToBeCreated.save();

        return res.status(201).json(created);
    } catch (error) {
        return next(error);
    }
};

const editPut = async(req, res, next) => {
    try {
        const { id } = req.params; // req.params.id
        const fields = {...req.body};
        const options = { new: true };
        console.log('fields en Author', options);
        const edited = await Author.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited);
    }
    catch(error) {
        return next(error);
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Author.deleteOne({ _id: id });
        if (deleted.deletedCount) {
            return res.status(200).json("Elemento eliminado con éxito");
        } else {
            return res.status(200).json("No se encuentra el elemento para eliminar");
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    indexGet,
    getById,
    getByName,
    createPost,
    editPut,
    deleteAuthor,
};

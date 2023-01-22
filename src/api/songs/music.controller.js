const Music = require("./music.model");

const indexGet = async (req, res, next) => {
    try {
        const allMusics = await Music.find();
        return res.status(200).json(allMusics);
    }
    catch (error) {
        return next(error);
    }
};
const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Music.findById(id);
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};

const getByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const found = await Music.find({name: name});
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        console.log(req.body);

        const musicToBeCreated = new Music(req.body);

        const created = await musicToBeCreated.save();

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
        console.log('fields en music', options);
        const edited = await Music.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited);
    }
    catch(error) {
        return next(error);
    }
}

const deleteMusic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Music.deleteOne({ _id: id });
        if (deleted.deletedCount) {
            return res.status(200).json("Elemento eliminado con éxito");
        } else {
            return res.status(200).json("No se encuentra el elemento para eliminar");
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    indexGet,
    getById,
    getByName,
    createPost,
    editPut,
    deleteMusic
};
const isAuth = (req, res, next) => {
    if(!req.user) {
        const error = new Error('Necesitas estar autenticado para acceder a este lugar');
        error.status = 401;
        return next(error);
    }

    return next();
};


const isAdmin = (req, res, next) => {
    if(!req.user) {
        const error = new Error('Debes loguearte');
        error.status = 401;
        return next(error);
    }

    if(req.user.role !== 'admin') {
        const error = new Error("No tienes los permisos necesarios");
        error.status = 403;
        return next(error);
    }

    return next();
};

const hasRole = (roles) => (req, res, next) => {
    if (!req.user) {
        const error = new Error("Debes loguearte");
        error.status = 401;
        return next(error);
    }

    if (!roles.includes(req.user.role)) {
        const error = new Error("No tienes los permisos necesarios");
        error.status = 403;
        return next(error);
    }

    return next();
};

module.exports = {
    isAuth,
    isAdmin,
    hasRole,
};
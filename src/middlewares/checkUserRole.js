// middleware/checkUserRole.js

export const checkUserRole = (req, res, next) => {
    try {
        // Asegúrate de que el token contiene el campo 'role'
        const { role } = req.user;

        console.log('User Role:', role); // Agrega esta línea para imprimir el rol del usuario

        const allowedRoles = ['admin']; // Puedes ajustar esto según tus necesidades

        if (!role || !allowedRoles.includes(role)) {
            // Si el usuario no tiene un rol o su rol no está en los roles permitidos
            console.log('Access Denied'); // Agrega esta línea para imprimir si el acceso se denegó
            return res.status(403).json({ message: 'Acceso no autorizado. No tienes permisos para acceder a esta página.' });
        }

        // Si el usuario tiene un rol permitido, permite el acceso
        console.log('Access Accepted'); // Agrega esta línea para imprimir si el acceso se concede
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

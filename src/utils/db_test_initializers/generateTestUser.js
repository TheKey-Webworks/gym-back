const { models } = require("../../config/sequelize");
const logger = require("../../config/winston");

async function generateTestUserGym() {
    try {
        const { Platform, GymUser } = models;
        const currentPlatform = await Platform.findOne();

        // Datos de ejemplo para los usuarios
        const mockUsers = [
            { firstName: "Juan", lastName: "Pérez", email: "juan.perez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Ana", lastName: "Gómez", email: "ana.gomez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Carlos", lastName: "López", email: "carlos.lopez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "María", lastName: "Rodríguez", email: "maria.rodriguez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "José", lastName: "Martínez", email: "jose.martinez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Luisa", lastName: "García", email: "luisa.garcia@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Pedro", lastName: "Hernández", email: "pedro.hernandez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Laura", lastName: "Sánchez", email: "laura.sanchez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Miguel", lastName: "Martín", email: "miguel.martin@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" },
            { firstName: "Elena", lastName: "Pérez", email: "elena.perez@example.com", password: "password123", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" }
        ];

        // Bucle para crear 10 usuarios de prueba
        for (let i = 0; i < mockUsers.length; i++) {
            const mockUser = mockUsers[i];

            const [user, created] = await GymUser.findOrCreate({
                where: { email: mockUser.email },
                defaults: mockUser
            });

            if (created) {
                logger.info(`Usuario de prueba creado (GYM) - ${mockUser.firstName} ${mockUser.lastName}`);
                user.setPlatform(currentPlatform);
            } else {
                logger.info(`El usuario ya existía (GYM) - ${mockUser.firstName} ${mockUser.lastName}`);
            }
        }
    } catch (error) {
        logger.error("Error al crear los usuarios de gimnasio:", error);
    }
}

module.exports = {
    generateTestUserGym
};

const { z } = require("zod");
const logger = require("../config/winston");

const platformUserRegisterZSchema = z.object({
    username: z.string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(20, "El nombre de usuario no puede exceder los 20 caracteres"),

    email: z.string()
        .email("El correo electrónico no es válido"),

    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña no puede exceder los 50 caracteres"),

    confirmPassword: z.string(),

    age: z.number()
        .int()
        .min(18, "Debes ser mayor de 18 años")
        .max(99, "Edad no válida"),

    // termsAccepted: z.boolean().refine(val => val === true, {
    //     message: "Debes aceptar los términos y condiciones"
    // }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
});

const platformUserLoginZSchema = z.object({
    username: z.string()
        .min(3, "Ingresa un nombre de usuario o email válidos"),

    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña no puede exceder los 50 caracteres"),
});



function parseSchema(schema, data) {
    const result = schema.safeParse(data);

    if (!result.success) {
        logger.error("Error en la validación del formulario:");
        logger.error(result.error.format());
        return {
            success: false, errors: result.error.issues.map(e => ({
                path: e.path[0],
                message: e.message
            }))
        };
    }

    return { success: true, data: result.data };
}

module.exports = {
    platformUserRegisterZSchema,
    platformUserLoginZSchema,
    parseSchema
};

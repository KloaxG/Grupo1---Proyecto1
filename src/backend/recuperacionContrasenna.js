const nodemailer = require('nodemailer');

function randomPassword() {
    const caracteres =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += caracteres.charAt(
            Math.floor(Math.random() * caracteres.length)
        );
    }
    return password;
}

const cambioContrasenna = async (destinatario) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: 'gerardogomc99@gmail.com',
                pass: 'qgqy uxul jarp xuej',
            },
        });
        if (!destinatario) {
            console.error('No se ha definido ningún destinatario');
            return;
        }

        // Genera la nueva contraseña de manera síncrona
        const newPassword = randomPassword();

        // Envía el correo con la nueva contraseña
        await transporter.sendMail({
            from: `SyncTravel <${'gerardogomc99@gmail.com'}>`,
            to: destinatario,
            subject: 'Cambio de contraseña',
            title: 'Cambio de contraseña',
            html: `<h1>Se ha cambiado su contraseña</h1>
                <p>Sus credenciales son:</p>
                <p>Correo: ${destinatario}</p>
                <p>Su nueva contraseña es: ${newPassword}</p>
                <p>Por favor, no comparta sus credenciales con nadie.</p>
                <p>Si usted no ha solicitado este cambio, por favor contacte a nuestro servicio de soporte.</p>
                <p>Gracias.</p>
                <p>El equipo de SyncTravel</p>
            `,
        });

        // Retorna la nueva contraseña
        return newPassword;
    } catch (error) {
        console.error(error);
        return null; // Cambiado para devolver un valor explícito en caso de error
    }
};

module.exports = cambioContrasenna;

const nodemailer = require('nodemailer');

const user = 'gerardogomc99@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user,
        pass: 'qgqy uxul jarp xuej',
    },
});

async function enviarCorreo(mensaje, destinatario, password) {
    try {
        const resultado = await transporter.sendMail({
            from: user,
            to: destinatario,
            subject: 'Bienvenido a la plataforma de SyncTravel',
            html: `<div>
                    <h1>¡Bienvenido a SyncTravel!</h1>
                    <p>${mensaje}</p>
                    <p>
                    A continuación le detallamos la creación del usuario con las siguientes credenciales: 
                    <ul>
                        <li>Correo: ${destinatario}</li>
                        <li>Contraseña: ${password}</li>
                    </ul>
                    </p>
                    <p>¡Gracias por confiar en nosotros!</p>
                    <p>El equipo de SyncTravel</p>
                    </div>`,
        });
    } catch (error) {
        console.error(error);
        return;
    }
}

module.exports = enviarCorreo;

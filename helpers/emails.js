const nodemailer= require("nodemailer")

const emailRegistro= async (datos)=>{

    const {email,nombre,token}= datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bd08cbd0a82f40",
          pass: "f5414b9ac1a97e"
        }
      });

      const info= await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Compureba tu Cuenta",
        text: "Compureba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya casi esta lista, solo debes comprobarla en el siguente enlace:

        <a href="http://localhost:5173/confirmar-cuenta/${token}"> Comprobar Cuenta </a>
        
        `,
      })
}

const emailOlvidePassword= async (datos)=>{

  const {email,nombre,token}= datos

  const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bd08cbd0a82f40",
        pass: "f5414b9ac1a97e"
      }
    });

    const info= await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "Uptask - Restablece tu Password",
      text: "Restablece tu Password",
      html: `<p>Hola: ${nombre} has solicitado restablecer tu password</p>
      <p>sigue el siguente enlace para generar el nuevo password:

      <a href="http://localhost:5173/olvide-password/${token}"> Restablecer Password </a>
      
      `,
    })
}


module.exports={
    emailRegistro,
    emailOlvidePassword
}
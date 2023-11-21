const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'domas',
  password: '159357',
  port: '5432'
});

const app = express();

//middlewares:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let dbusuarios = [];

app.get('/', (req, res) => {
  res.sendFile('./public/login/login.html', {
    root: __dirname
  });
});


app.get('/recovery', (req, res) => {
    res.sendFile('./public/recovery/recovery.html', {
        root: __dirname
    });
});

app.post('/recover', async (req, res) => {
    const { email } = req.body;

    try {
        // Realiza la lógica para recuperar la contraseña del usuario
        // y enviarla por correo electrónico.

        // Aquí debes agregar la lógica para buscar la contraseña en la base de datos
        // y enviarla por correo electrónico al usuario.
        
        // Luego, usa nodemailer para enviar el correo electrónico con la contraseña
        const transporter = nodemailer.createTransport({
            // Configuración del servicio de correo electrónico (por ejemplo, Gmail)
            service: 'gmail',
            auth: {
                user: 'tu_correo@gmail.com',
                pass: 'tu_contraseña'
            }
        });

        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            text: 'Tu contraseña es: [Contraseña]'
        };

        await transporter.sendMail(mailOptions);

        // Envía una respuesta al cliente indicando que se ha enviado el correo
        res.send('Se ha enviado un correo con la contraseña.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo.');
    }
});
app.post('/api/alumnos/add', async (req, res) => {
  const { email, password } = req.body;

   const correoInstitucionalRegex = /^[a-zA-Z0-9._%+-]+@unach\.mx$/;

   if (!correoInstitucionalRegex.test(email)) {
     return res.status(400).send('Ingresa un correo institucional válido (@unach.mx)');
   }
    console.log('Datos recibidos del formulario:', { email, password });
    
    try {
      console.log('Datos recibidos del formulario:', { email, password });
      const result = await pool.query("SELECT correo_institucional, password FROM usuarios WHERE correo_institucional = $1 AND password = $2", [email, password]);
     
      console.log('Resultado de la consulta:', result.rows);
      

      if (result.rows.length > 0) {
        // Usuario válido
        res.redirect('/menu');
      } else {
        // Usuario inválido
        console.log('Credenciales incorrectas. No se encontraron coincidencias en la base de datos.');
        res.status(401).send('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error interno del servidor');
    }
});

app.get('/menu', (req, res) => {
  res.sendFile('./public/menu/menu.html', {
    root: __dirname
  });
});

app.listen(3000, () => {
  console.log(`Server on port ${3000}`);
});

// const {Pool} = require('pg');

// const config =({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'domas',
//     password: '159357',
//     port: '5432'
//   })
// const pool = new Pool(config);

//   const getUsers = async() =>{
//     try {
//         const respuesta = await pool.query('select * from usuaios');
//         console.log(respuesta.rows)
//         pool.end
//     } catch (error) {
//             console.log("El usuario no ha sido encontrado")
//         }
//   }

// const insert = async() =>{
//     const text = ('insert into  usuarios (iduser, nombre, correo_institucional, password) values($1, $2, $3, $4)')
//     const values = [3,'Salvador Enrique Veltran','salvador.enrique@unach.mx','salv1282']
    
//     const insertar = await pool.query(text,values)
//     console.log(insertar) 

// }

// getUsers()

//  const res = async() =>{
//      const respuesta = await pool.query('select * from usuarios');
//      console.log(respuesta.rows)
//      pool.end
//  }
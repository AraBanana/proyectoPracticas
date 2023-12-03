const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');


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


//Recuperar contraseña 
app.post('/recover', async (req, res) => {
    const { email } = req.body;

    const config_mail ={
      host : 'smtp.gmail.com',
      port : 587,
      auth : {
        user : 'araelhidalgojuarez@gmail.com',
        pass : 'mvjs gzrk hmag mooa'
      }
    }
    try {
        const result = await pool.query("SELECT password FROM usuarios WHERE correo_recuperacion = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(404).send('No user found with the provided email');
        }

        const password = result.rows[0].password;

        /**
         * Envía un correo electrónico con la contraseña de recuperación.
         * @async
         * @function enviarMail
         * @returns {Promise<void>} No devuelve ningún valor.
         */
        async function enviarMail() {
            const mensaje = {
                from: 'araelhidalgojuarez@gmail.com',
                to: email,
                subject: 'Recuperación de Contraseña',
                text: `Tu contraseña es: ${password}`
            }

            const transport = nodemailer.createTransport(config_mail);

            const info = await transport.sendMail(mensaje);

            console.log('Message sent: %s', info.messageId);
        }
        await enviarMail();

        // Enviando la respuesta tipo JSON
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo.');
    }
});



//FORMULARIO
app.post('/formularioLiberacion', async (req, res) => {
 
  const { nombre, semestre, grupo, matricula, periodo, dia, mes, calificacion } = req.body;
  try {
    // Cargar el documento PDF existente
    const existingPdfBytes = fs.readFileSync('/Users/araelhidalgojuarez/GIT/proyectoPracticas/cartaLiberacion2.pdf');
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener el formulario y el campo de texto
    let form = pdfDoc.getForm();
    let pdfNombre = form.getTextField('nombreAlumno');
    let pdfSemestre = form.getTextField('semestre');
    let pdfGrupo = form.getTextField('grupo');
    let pdfMatricula = form.getTextField('matricula');
    let pdfPeriodo = form.getTextField('periodo');
    let pdfDia = form.getTextField('fecha');
    let pdfMes = form.getTextField('mes');
    let pdfCalificacion = form.getTextField('calificacion');

    // Establecer el valor del campo de texto
    pdfNombre.setText(nombre);
    pdfSemestre.setText(semestre);
    pdfGrupo.setText(grupo);
    pdfMatricula.setText(matricula);
    pdfPeriodo.setText(periodo);
    pdfDia.setText(dia);
    pdfMes.setText(mes);
    pdfCalificacion.setText(calificacion);

    const pdfBytes = await pdfDoc.save();

    // Guardar el PDF modificado en un archivo
    
    fs.writeFileSync('/Users/araelhidalgojuarez/GIT/proyectoPracticas/cartaResultado.pdf', pdfBytes);

    // Aquí continúa tu código existente...
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el formulario de presentacion');
  }
});

app.post('/formularioPropuesta', async (req, res) => {
 
  const { antecedentes, problematica, soluciones, alcances, integrantes, integrante } = req.body;
  try {
    // Cargar el documento PDF existente
    const existingPdfBytes = fs.readFileSync('/Users/araelhidalgojuarez/GIT/proyectoPracticas/propuestaProyecto2.pdf');
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener el formulario y el campo de texto
    let form = pdfDoc.getForm();
    let pdfAntecedentes = form.getTextField('antecedentes');
    let pdfProblematica = form.getTextField('problematica');
    let pdfSoluciones = form.getTextField('soluciones');
    let pdfAlcances = form.getTextField('alcances');
    let pdfIntegrantes = form.getTextField('integrantes');
    let pdfIntegrante = form.getTextField('integrante');
    

    // Establecer el valor del campo de texto
    pdfAntecedentes.setText(antecedentes);
    pdfProblematica.setText(problematica);
    pdfSoluciones.setText(soluciones);
    pdfAlcances.setText(alcances);
    pdfIntegrantes.setText(integrantes);
    pdfIntegrante.setText(integrante);
    
  

    // Serializar el PDFDocument a bytes (un Uint8Array)

    const pdfBytes = await pdfDoc.save();

    // Guardar el PDF modificado en un archivo
    
    fs.writeFileSync('/Users/araelhidalgojuarez/GIT/proyectoPracticas/cartaResultadoPropuesta.pdf', pdfBytes);

    // Aquí continúa tu código existente...
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el formulario de propuesta');
  }
});

app.post('/api/alumnos/add', async (req, res) => {
  const { email, password } = req.body;
  const { nombre, apellidos, matricula, empresa, grado, grupo } = req.body;

  const correoInstitucionalRegex = /^[a-zA-Z0-9._%+-]+@unach\.mx$/;

  if (!correoInstitucionalRegex.test(email)) {
    return res.status(400).send('Ingresa un correo institucional válido (@unach.mx)');
  }

  console.log('Datos recibidos del formulario:', { email, password });

  try {
    console.log('Datos recibidos del formulario:', { email, password });
    const query = {
      text: 'SELECT correo_institucional, password FROM usuarios WHERE correo_institucional = $1 AND password = $2',
      values: [email, password]
    };
    const result = await pool.query(query);

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
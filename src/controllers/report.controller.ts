import { Request, Response } from 'express'
import { connect  } from '../db'
import PDFDocument from 'pdfkit-table';
import path from 'path';

export async function generateCategoryPDF(_req: Request, res: Response): Promise<void> {
    const conn = await connect();
    try {
      // Realizar la consulta para obtener las categorías
      const [categories] = await conn.query('SELECT `id_category`, `name_category`, `image` FROM `category`');
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
      // Configurar las cabeceras de la respuesta para indicar que es un PDF
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=categories.pdf'
      });
  
      // Escuchar los eventos 'data' y 'end' del documento PDF
      doc.on('data', (chunk) => res.write(chunk));
      doc.on('end', () => res.end());
  
      // Agregar las imágenes al encabezado
      const logoLeftPath = path.join(__dirname, '..', 'assets/image', 'logo_left.png');
      const logoRightPath = path.join(__dirname, '..', 'assets/image', 'logo_right.png');
      doc.image(logoLeftPath, 50, 15, { width: 50 })
         .image(logoRightPath, 460, 15, { width: 100 });
  
      // Título del reporte y fecha de generación
      doc.fontSize(18).text('Reporte de Categorías', { align: 'center' });
      doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: 'center' });
      doc.moveDown(2);
  
      // Crear una tabla con los datos de las categorías
      const table = {
        title: ('Categorías'),
        headers: ['ID', 'Nombre', 'Imagen'],
        rows: (categories as any[]).map(category => [
          category.id_category, 
          category.name_category, 
          category.image
        ])
      };
  
      // Dibujar la tabla
      await doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
        prepareRow: (_row, _i) => doc.font('Helvetica').fontSize(10)
      });
  
      // Finalizar el documento PDF
      doc.end();
    } catch (error) {
      res.status(500).json({ message: 'Error generating PDF', error });
    }
  }

// Reporte de los usuarios
export async function reportUserPDF(_req: Request, res: Response): Promise<void> {
  const conn = await connect();
  try {
    // Realizar la consulta para obtener las categorías
    const [users] = await conn.query('SELECT `id_user`, `name`, `last_name`, `age`, `mail` FROM `user` WHERE usertype_id = 2');

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Configurar las cabeceras de la respuesta para indicar que es un PDF
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=ReporteUsuarios.pdf'
    });

    // Escuchar los eventos 'data' y 'end' del documento PDF
    doc.on('data', (chunk) => res.write(chunk));
    doc.on('end', () => res.end());

    // Agregar las imágenes al encabezado
    const logoLeftPath = path.join(__dirname, '..', 'assets/image', 'logo_left.png');
    const logoRightPath = path.join(__dirname, '..', 'assets/image', 'logo_right.png');
    doc.image(logoLeftPath, 50, 15, { width: 50 })
       .image(logoRightPath, 460, 15, { width: 100 });

    // Título del reporte y fecha de generación
    doc.fontSize(18).text('Reporte de Usuarios', { align: 'center' });
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Crear una tabla con los datos de las categorías
    const table = {
      title: ('Usuarios Registrados en la Aplicación'),
      headers: ['ID', 'Nombre', 'Edad', 'Email'],
      rows: (users as any[]).map(user => [
        user.id_user, 
        user.name + ' ' + user.last_name, 
        user.age,
        user.mail
      ])
    };

    // Dibujar la tabla
    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
      prepareRow: (_row, _i) => doc.font('Helvetica').fontSize(10)
    });

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
}

// Reporte de todos los sitios turisticos registrados
export async function reportAllSitesPDF(_req: Request, res: Response): Promise<void> {
  const conn = await connect();
  try {
    // Realizar la consulta para obtener las categorías
    const [places] = await conn.query('SELECT p.id_place, p.name_place, p.address, c.name_category FROM place p INNER JOIN category c ON p.category_id = c.id_category');

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Configurar las cabeceras de la respuesta para indicar que es un PDF
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=ReporteSitios.pdf'
    });

    // Escuchar los eventos 'data' y 'end' del documento PDF
    doc.on('data', (chunk) => res.write(chunk));
    doc.on('end', () => res.end());

    // Agregar las imágenes al encabezado
    const logoLeftPath = path.join(__dirname, '..', 'assets/image', 'logo_left.png');
    const logoRightPath = path.join(__dirname, '..', 'assets/image', 'logo_right.png');
    doc.image(logoLeftPath, 50, 15, { width: 50 })
       .image(logoRightPath, 460, 15, { width: 100 });

    // Título del reporte y fecha de generación
    doc.fontSize(18).text('Reporte de Sitios', { align: 'center' });
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Crear una tabla con los datos de las categorías
    const table = {
      title: ('Todos los Lugares Registrados en la Aplicación'),
      headers: ['ID', 'Nombre Sitio', 'Dirección', 'Categoría'],
      rows: (places as any[]).map(place => [
        place.id_place, 
        place.name_place , 
        place.address,
        place.name_category
      ])
    };

    // Dibujar la tabla
    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
      prepareRow: (_row, _i) => doc.font('Helvetica').fontSize(10)
    });

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
}

// Reporte de los sitios turisticos por popularidad 
export async function reportPopularSitePDF(_req: Request, res: Response): Promise<void> {
  const conn = await connect();
  try {
    // Realizar la consulta para obtener las categorías
    const [places] = await conn.query('SELECT p.id_place, p.name_place, p.address, c.name_category, AVG(cm.rate) AS average_rating FROM place p INNER JOIN comment cm ON p.id_place = cm.place_id INNER JOIN category c ON p.category_id = c.id_category GROUP BY p.id_place, c.name_category HAVING AVG(cm.rate) >= 3 ORDER BY average_rating DESC;');

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Configurar las cabeceras de la respuesta para indicar que es un PDF
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=ReporteSitiosPopulares.pdf'
    });

    // Escuchar los eventos 'data' y 'end' del documento PDF
    doc.on('data', (chunk) => res.write(chunk));
    doc.on('end', () => res.end());

    // Agregar las imágenes al encabezado
    const logoLeftPath = path.join(__dirname, '..', 'assets/image', 'logo_left.png');
    const logoRightPath = path.join(__dirname, '..', 'assets/image', 'logo_right.png');
    doc.image(logoLeftPath, 50, 15, { width: 50 })
       .image(logoRightPath, 460, 15, { width: 100 });

    // Título del reporte y fecha de generación
    doc.fontSize(18).text('Reporte de Sitios Populares', { align: 'center' });
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Crear una tabla con los datos de las categorías
    const table = {
      title: ('Lugares con Mejor Puntuación'),
      headers: ['ID', 'Nombre Sitio', 'Dirección', 'Categoría', 'Calificación'],
      rows: (places as any[]).map(place => [
        place.id_place, 
        place.name_place, 
        place.address,
        place.name_category,
        place.average_rating
      ])
    };

    // Dibujar la tabla
    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
      prepareRow: (_row, _i) => doc.font('Helvetica').fontSize(10)
    });

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
}

// Reporte de los sitios turisticos por baja popularidad
export async function reportUnPopularSitePDF(_req: Request, res: Response): Promise<void> {
  const conn = await connect();
  try {
    // Realizar la consulta para obtener las categorías
    const [places] = await conn.query('SELECT p.id_place, p.name_place, p.address, c.name_category, AVG(cm.rate) AS average_rating FROM place p INNER JOIN comment cm ON p.id_place = cm.place_id INNER JOIN category c ON p.category_id = c.id_category GROUP BY p.id_place, c.name_category HAVING AVG(cm.rate) <= 2.9 ORDER BY average_rating DESC;');

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Configurar las cabeceras de la respuesta para indicar que es un PDF
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=ReporteSitiosNoPopulares.pdf'
    });

    // Escuchar los eventos 'data' y 'end' del documento PDF
    doc.on('data', (chunk) => res.write(chunk));
    doc.on('end', () => res.end());

    // Agregar las imágenes al encabezado
    const logoLeftPath = path.join(__dirname, '..', 'assets/image', 'logo_left.png');
    const logoRightPath = path.join(__dirname, '..', 'assets/image', 'logo_right.png');
    doc.image(logoLeftPath, 50, 15, { width: 50 })
       .image(logoRightPath, 460, 15, { width: 100 });

    // Título del reporte y fecha de generación
    doc.fontSize(18).text('Reporte de Sitios Poco Populares', { align: 'center' });
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Crear una tabla con los datos de las categorías
    const table = {
      title: ('Lugares con Baja Puntuación'),
      headers: ['ID', 'Nombre Sitio', 'Dirección', 'Categoría', 'Calificación'],
      rows: (places as any[]).map(place => [
        place.id_place, 
        place.name_place, 
        place.address,
        place.name_category,
        place.average_rating
      ])
    };

    // Dibujar la tabla
    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
      prepareRow: (_row, _i) => doc.font('Helvetica').fontSize(10)
    });

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
}

// Reporte de los sitios turisticos comentarios 
export async function reportCommentsByPlacePDF(req: Request, res: Response): Promise<void> {
  const conn = await connect();
  const { place_id } = req.params; // Obtener el place_id desde los parámetros de la solicitud

  try {
    // Realizar la consulta para obtener los comentarios de un lugar específico
    const [comments] = await conn.query(`
      SELECT c.id_comment, c.content, c.rate, c.date, u.name AS user_name, u.last_name AS user_last_name, p.name_place
      FROM comment c
      JOIN user u ON c.user_id = u.id_user
      JOIN place p ON c.place_id = p.id_place
      WHERE p.id_place = ?
      ORDER BY c.rate DESC;
    `, [place_id]);

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Configurar las cabeceras de la respuesta para indicar que es un PDF
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=ReporteComentariosSitio${place_id}.pdf`
    });

    // Escuchar los eventos 'data' y 'end' del documento PDF
    doc.on('data', (chunk) => res.write(chunk));
    doc.on('end', () => res.end());

    // Agregar las imágenes al encabezado
    const logoLeftPath = path.join(__dirname, '..', 'assets/image', 'logo_left.png');
    const logoRightPath = path.join(__dirname, '..', 'assets/image', 'logo_right.png');
    doc.image(logoLeftPath, 50, 15, { width: 50 })
       .image(logoRightPath, 460, 15, { width: 100 });

    // Título del reporte y fecha de generación
    doc.fontSize(18).text(`Reporte de Comentarios del Sitio ${place_id}`, { align: 'center' });
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Crear una tabla con los datos de los comentarios
    const table = {
      title: 'Comentarios del Sitio',
      headers: ['ID Comentario', 'Usuario', 'Comentario', 'Calificación', 'Fecha'],
      rows: (comments as any[]).map(comment => [
        comment.id_comment,
        `${comment.user_name} ${comment.user_last_name}`,
        comment.content,
        comment.rate.toFixed(1), // Calificación con un decimal
        new Date(comment.date).toLocaleString() // Formato de fecha legible
      ])
    };

    // Dibujar la tabla
    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
      prepareRow: (_row, _i) => doc.font('Helvetica').fontSize(10)
    });

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
}
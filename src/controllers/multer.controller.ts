import {  Request, Response } from "express";
import multer from "multer";
import { connect } from "../db";
import Place from "../model/place";
import fs from "node:fs";


const upload = multer({ dest: "src/uploads/" });

export const uploadImageAndCreatePlace = async (req: Request, res: Response) => {
    upload.single("imageUpload")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al cargar la imagen" });
      }
      try {
        const fullPath = saveImage(req.file); // Guardar la imagen en el servidor y obtener la ruta
        const newPlace: Place = req.body;
        

        const conn = await connect();
        await conn.query(
          "INSERT INTO place (name_place, description, image, address, lat, lng, category_id) VALUES (?,?,?,?,?,?,?)",
          [
            newPlace.name_place,
            newPlace.description,
            fullPath, // Guardar la ruta de la imagen en la base de datos
            newPlace.address,
            newPlace.lat,
            newPlace.lng,
            newPlace.category_id,
          ]
        );
  
        return res.json({
          menssage: "Lugar añadido correctamente",
          imagePath: fullPath, // Devolver la ruta de la imagen en la respuesta
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Error de conexión",
        });
      }
    });
  };

  function saveImage(file: any) {
    const newPath = `src/uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
  }
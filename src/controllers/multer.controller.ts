import {  Request, Response } from "express";
import multer from "multer";
import { connect } from "../db";
import Place from "../model/place";


const upload = multer({ dest: "assets/uploads/" });

export const uploadImageAndCreatePlace = async (req: Request, res: Response) => {
  upload.single("imageUpload")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "Error al cargar la imagen" });
      }
      try {
        const fullPath = req.file?.path; 
        const newPlace: Place = req.body;

        const conn = await connect();
        await conn.query(
          "INSERT INTO place (name_place, description, description_en, image, address, lat, lng, category_id) VALUES (?,?,?,?,?,?,?,?)",
          [
            newPlace.name_place,
            newPlace.description,
            newPlace.description_en,
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

 
  export async function updatePlaceMulter(req: Request, res: Response) {
    upload.single("imageUpload")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "Error al cargar la imagen" });
        }
        const id = req.params.placeId;
        const newUpdatePlace: Place = req.body;
        const fullPath = req.file?.path;
        const conn = await connect();
        try {
          await conn.query(
            "UPDATE place SET name_place = IFNULL(?,name_place), description = IFNULL(?,description), description_en = IFNULL(?,description_en), image = IFNULL(?,image), address = IFNULL(?,address), lat = IFNULL(?,lat), lng = IFNULL(?,lng), category_id = IFNULL(?,category_id) WHERE id_place =?",
            [
              newUpdatePlace.name_place,
              newUpdatePlace.description,
              newUpdatePlace.description_en,
              fullPath,
              newUpdatePlace.address,
              newUpdatePlace.lat,
              newUpdatePlace.lng,
              newUpdatePlace.category_id,
              id,
            ]
          );

          const place = await conn.query("SELECT * FROM place WHERE id_place = ?", [
            id,
          ]);
          return res.json({
            menssage: "Lugar Actualizado",
            place: place[0], 
          });
        } catch (error) {
          return res.status(500).json({
            message: "connect error",
          });
        }
      })
  }




 
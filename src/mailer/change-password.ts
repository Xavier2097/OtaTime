import { Request, Response } from 'express'


export async function changePassword (req: Request, res: Response): Promise<Response>{
    const email = req.params.mail
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cambiar Contraseña</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #EEFEFA;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                height: 100vh;
            }
            .container {
                text-align: center;

            }
            form {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 300px;
                text-align: center;
                margin-top: 20px;
            }
            input[type="password"] {
                width: calc(100% - 20px);
                padding: 10px;
                margin-bottom: 20px;
                border: 1px solid #17B39E;
                border-radius: 16px;
                box-sizing: border-box;
                height: 50px;
            }
            label {
                color: #17B39E;
                font-weight: bold;
                display: block;
                margin-bottom: 10px;
                text-align: left;
            }
            button[type="submit"] {
                background-color: #17B39E;
                color: white;
                border: none;
                border-radius: 16px;
                padding: 10px 20px;
                cursor: pointer;
                font-size: 16px;
                height: 50px;
            }
            button[type="submit"]:hover {
                background-color: #12866F;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Cambiar Contraseña</h1>
            <form action="/api/user/update-password/${email}" method="post">
                <label for="newPassword">Nueva Contraseña:</label>
                <input type="password" id="newPassword" name="newPassword" placeholder="Nueva contraseña" required>
                <button type="submit">Actualizar Contraseña</button>
            </form>
            </div>
        </body>
        </html>
    `);
    return res;
}
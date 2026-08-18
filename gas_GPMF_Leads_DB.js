function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // GUARDAR DATOS (Orden exacto: A hasta I)
        sheet.appendRow([
            new Date(),           // A: Fecha
            data.nombre,          // B: Nombre
            data.email,           // C: Email
            data.empresa,         // D: Empresa
            data.presupuesto,     // E: Presupuesto
            data.desafio,         // F: Desafío
            data.etapa,           // G: Etapa
            data.dolor,           // H: Dolor
            data.urgencia         // I: Urgencia
        ]);

        // ENVIAR CONFIRMACIÓN AL CLIENTE (DISEÑO PREMIUM)
        const htmlCliente = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 40px 20px; }
                .wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                .header { background-color: #000000; padding: 30px; text-align: center; border-bottom: 4px solid #7A0F32; }
                .content { padding: 40px; color: #2E2E2E; line-height: 1.6; }
                h1 { color: #7A0F32; font-size: 24px; margin-top: 0; font-weight: 600; letter-spacing: -0.5px; }
                p { font-size: 16px; margin-bottom: 20px; color: #4a4a4a; }
                .highlight-box { background-color: #fdf2f5; border-left: 4px solid #7A0F32; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0; }
                .highlight-box p { margin: 0; color: #7A0F32; font-weight: 500; font-size: 15px; line-height: 1.5; }
                .footer { background-color: #f9f9f9; padding: 25px 40px; text-align: center; border-top: 1px solid #eeeeee; }
                .footer p { font-size: 12px; color: #888888; margin: 0 0 5px 0; }
                .footer a { color: #7A0F32; text-decoration: none; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="header">
                    <!-- Logo alojado públicamente para que cargue en el correo -->
                    <img src="https://globalpartnerships.vercel.app/Assets/GPMF%20LOGO%20white.png" alt="GPMF Logo" style="height: 40px;">
                </div>
                <div class="content">
                    <h1>Diagnóstico Estratégico Recibido</h1>
                    <p>Hola <strong>\${data.nombre}</strong>,</p>
                    <p>Gracias por confiar en GPMF. Hemos capturado exitosamente la información estratégica de <strong>\${data.empresa}</strong>.</p>
                    
                    <div class="highlight-box">
                        <p>Nuestro equipo de socios analizará tu caso para validar la ruta crítica y la alineación con nuestra experticia. Nos pondremos en contacto contigo en las próximas <strong>24 a 48 horas</strong> con el análisis y los siguientes pasos.</p>
                    </div>
                    
                    <p>Atentamente,<br><strong>El Equipo de GPMF</strong></p>
                </div>
                <div class="footer">
                    <p>Global Partnerships Multidisciplinary Firm</p>
                    <p>Bogotá • Clermont-Ferrand • Montreal</p>
                    <p><a href="https://globalpartnerships.vercel.app">Sitio Web Oficial</a></p>
                </div>
            </div>
        </body>
        </html>`;

        MailApp.sendEmail({
            to: data.email,
            subject: "Confirmación de Recepción - GPMF",
            htmlBody: htmlCliente
        });

        return ContentService.createTextOutput(JSON.stringify({ "success": true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({ "success": false, "error": err.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function pruebaFinalGPMF() {
    // 1. PEGA AQUÍ TU NUEVA URL QUE TERMINA EN /EXEC
    const url = "https://script.google.com/macros/s/AKfycbzhT6BHWHtROop8FTAlhOBcQ3sfFBj-P5bgTBjHgUTGuaU5CbQWsi9g4K8zM6FbBzI/exec";


    // 2. Datos exactos como los envía tu HTML
    const datosSimulados = {
        nombre: "Cliente de Prueba ICP",
        email: "marcela@test.com",
        empresa: "Empresa Ejemplo S.A.S.",
        presupuesto: "standard",
        desafio: "internacionalizacion",
        etapa: "planeacion",
        dolor: "Falta de red de contactos en Europa",
        urgencia: "alto"
    };

    const opciones = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(datosSimulados),
        muteHttpExceptions: true
    };

    try {
        const respuesta = UrlFetchApp.fetch(url, opciones);
        Logger.log("Respuesta de Google: " + respuesta.getContentText());
    } catch (e) {
        Logger.log("Error en la prueba: " + e.toString());
    }
}
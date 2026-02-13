/**
 * Google Apps Script para formulario de diagnóstico GPMF
 * Conecta el formulario web con Google Sheets
 * 
 * @OnlyCurrentDoc
 */

// Configuración
const CONFIG = {
  SPREADSHEET_ID: 'TU_SPREADSHEET_ID', // Reemplazar con tu ID de Google Sheets
  SHEET_NAME: 'Respuestas Radar',
  ADMIN_EMAIL: 'marcelasanchezv@gmail.com' // Email para notificaciones
};

/**
 * Función principal que maneja las peticiones POST del formulario web
 * @param {Object} e - Event object con los datos de la petición
 * @returns {TextOutput} Respuesta para el cliente
 */
function doPost(e) {
  try {
    // Verificar que sea una petición POST válida
    if (!e.postData || !e.postData.contents) {
      return createResponse('Error: No data received', 400);
    }

    // Parsear los datos JSON del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Validar datos requeridos
    if (!data.nombre || !data.email) {
      return createResponse('Error: Missing required fields', 400);
    }

    // Guardar en Google Sheets
    saveToSheet(data);
    
    // Enviar notificación por email
    sendEmailNotification(data);
    
    // Responder al cliente
    return createResponse('Success: Data saved and notification sent', 200);
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse('Error: ' + error.toString(), 500);
  }
}

/**
 * Guarda los datos del formulario en Google Sheets
 * @param {Object} data - Datos del formulario
 */
function saveToSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // Crear hoja si no existe
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
      setupSheetHeaders(newSheet);
      return saveToSheet(data); // Reintentar con la hoja creada
    }
    
    // Preparar fila con datos
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.nombre || '',
      data.email || '',
      data.empresa || '',
      data.desafio || '',
      data.etapa || '',
      data.dolor || '',
      data.urgencia || '',
      data.presupuesto || '',
      new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }) // Fecha local
    ];
    
    // Agregar fila a la hoja
    sheet.appendRow(rowData);
    
    Logger.log('Data saved to sheet successfully');
    
  } catch (error) {
    Logger.log('Error saving to sheet: ' + error.toString());
    throw error;
  }
}

/**
 * Configura los encabezados de la hoja (solo se ejecuta al crear la hoja)
 * @param {Sheet} sheet - Hoja de cálculo
 */
function setupSheetHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Nombre',
    'Email',
    'Empresa',
    'Desafío Principal',
    'Etapa del Proyecto',
    'Obstáculo Principal',
    'Urgencia',
    'Presupuesto Considerado',
    'Fecha Local (CO)'
  ];
  
  sheet.getRange('A1:J1').setValues([headers]);
  sheet.getRange('A1:J1').setFontWeight('bold');
  sheet.getRange('A1:J1').setBackground('#7A0F32');
  sheet.getRange('A1:J1').setFontColor('white');
  
  // Ajustar ancho de columnas
  sheet.autoResizeColumn(1); // Timestamp
  sheet.autoResizeColumn(2); // Nombre
  sheet.autoResizeColumn(3); // Email
  sheet.setColumnWidth(4, 300); // Empresa
  sheet.setColumnWidth(5, 250); // Desafío
  sheet.setColumnWidth(6, 200); // Etapa
  sheet.setColumnWidth(7, 400); // Obstáculo
  sheet.setColumnWidth(8, 150); // Urgencia
  sheet.setColumnWidth(9, 250); // Presupuesto
  sheet.setColumnWidth(10, 200); // Fecha local
}

/**
 * Envía notificación por email con los datos del formulario
 * @param {Object} data - Datos del formulario
 */
function sendEmailNotification(data) {
  try {
    const subject = `🎯 Nuevo Diagnóstico Estratégico - ${data.nombre}`;
    
    const htmlBody = createEmailHTML(data);
    const plainBody = createEmailPlain(data);
    
    // Configurar opciones del email
    const emailOptions = {
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      plainBody: plainBody,
      name: 'GPMF Radar Estratégico',
      replyTo: data.email
    };
    
    // Enviar email
    MailApp.sendEmail(emailOptions);
    
    Logger.log('Email notification sent successfully');
    
  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
    // No lanzar error para no interrumpir el flujo principal
  }
}

/**
 * Crea el cuerpo del email en formato HTML
 * @param {Object} data - Datos del formulario
 * @returns {string} HTML del email
 */
function createEmailHTML(data) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #7A0F32; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .section { margin-bottom: 25px; }
        .label { font-weight: bold; color: #7A0F32; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border-left: 4px solid #7A0F32; margin: 5px 0; }
        .urgent { background: #fff3cd; border-left: 4px solid #856404; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        .badge { display: inline-block; background: #7A0F32; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; margin-left: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 NUEVA SOLICITUD DE DIAGNÓSTICO</h1>
            <p>Radar Estratégico GPMF</p>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="label">📋 DATOS DE CONTACTO</div>
                <div class="value"><strong>Nombre:</strong> ${data.nombre}</div>
                <div class="value"><strong>Email:</strong> ${data.email}</div>
                <div class="value"><strong>Empresa:</strong> ${data.empresa}</div>
            </div>
            
            <div class="section">
                <div class="label">🎯 RESPUESTAS DEL RADAR</div>
                <div class="value"><strong>Desafío Principal:</strong> ${data.desafio}</div>
                <div class="value"><strong>Etapa del Proyecto:</strong> ${data.etapa}</div>
                <div class="value"><strong>Obstáculo Principal:</strong> ${data.dolor}</div>
                <div class="value ${data.urgencia === 'critico' ? 'urgent' : ''}">
                    <strong>Urgencia:</strong> ${data.urgencia.toUpperCase()}
                    ${data.urgencia === 'critico' ? '<span class="badge">URGENTE</span>' : ''}
                </div>
                <div class="value"><strong>Presupuesto Considerado:</strong> ${data.presupuesto}</div>
            </div>
            
            <div class="section">
                <div class="label">📅 INFORMACIÓN TEMPORAL</div>
                <div class="value"><strong>Fecha y Hora:</strong> ${data.timestamp}</div>
                <div class="value"><strong>Fecha Local (Colombia):</strong> ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Este mensaje fue generado automáticamente desde el formulario de diagnóstico estratégico de GPMF.</p>
            <p>Responder directamente a: <a href="mailto:${data.email}">${data.email}</a></p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Crea el cuerpo del email en formato texto plano
 * @param {Object} data - Datos del formulario
 * @returns {string} Texto plano del email
 */
function createEmailPlain(data) {
  return `
NUEVA SOLICITUD DE DIAGNÓSTICO ESTRATÉGICO - GPMF

=====================================
📋 DATOS DE CONTACTO
=====================================
• Nombre: ${data.nombre}
• Email: ${data.email}
• Empresa: ${data.empresa}

=====================================
🎯 RESPUESTAS DEL RADAR
=====================================
• Desafío Principal: ${data.desafio}
• Etapa del Proyecto: ${data.etapa}
• Obstáculo Principal: ${data.dolor}
• Urgencia: ${data.urgencia.toUpperCase()}
• Presupuesto Considerado: ${data.presupuesto}

=====================================
📅 INFORMACIÓN TEMPORAL
=====================================
• Fecha y Hora: ${data.timestamp}
• Fecha Local (Colombia): ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}

=====================================
💡 ACCIONES RECOMENDADAS
=====================================
${data.urgencia === 'critico' ? '⚠️  URGENTE: Responder en menos de 24 horas' : '• Responder dentro de 48 horas'}
${data.presupuesto === 'enterprise' ? '💰 Lead de alto valor - Asignar socio senior' : '• Asignar consultor adecuado'}
• Verificar perfil de LinkedIn: ${data.empresa}

---
Este mensaje fue generado automáticamente desde el formulario de diagnóstico estratégico de GPMF.
Responder directamente a: ${data.email}
  `;
}

/**
 * Crea una respuesta HTTP estandarizada
 * @param {string} message - Mensaje de respuesta
 * @param {number} statusCode - Código de estado HTTP
 * @returns {TextOutput} Objeto de respuesta
 */
function createResponse(message, statusCode) {
  return ContentService.createTextOutput(message)
    .setMimeType(ContentService.MimeType.TEXT)
    .setContentLanguage('es')
    .setCode(statusCode);
}

/**
 * Función para configuración inicial (ejecutar una vez)
 * Crea la hoja y configura los encabezados
 */
function setup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
      setupSheetHeaders(sheet);
      Logger.log('Sheet created and configured successfully');
    } else {
      setupSheetHeaders(sheet);
      Logger.log('Sheet headers updated');
    }
    
    // Compartir hoja con el admin (opcional)
    // spreadsheet.addEditor(CONFIG.ADMIN_EMAIL);
    
  } catch (error) {
    Logger.log('Error in setup: ' + error.toString());
  }
}

/**
 * Función de prueba para verificar el funcionamiento
 */
function test() {
  const testData = {
    timestamp: new Date().toISOString(),
    nombre: 'Test User',
    email: 'test@example.com',
    empresa: 'Test Company',
    desafio: 'internacionalizacion',
    etapa: 'planeacion',
    dolor: 'Test obstacle description',
    urgencia: 'alto',
    presupuesto: 'standard'
  };
  
  saveToSheet(testData);
  sendEmailNotification(testData);
  Logger.log('Test completed successfully');
}

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Usa path.join para construir rutas
const scssDir = path.join(__dirname, 'src/assets/scss');
const files = glob.sync(`${scssDir}/**/*.scss`);

// Función para leer y actualizar el contenido de los archivos SCSS
function updateSassFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Reemplazar funciones decoloración y deprecadas
    content = content
        .replace(/darken\(/g, 'color.scale(') // Reemplaza darken con color.scale
        .replace(/red\(/g, 'color.channel($color, "red", rgb)') // Reemplaza red con color.channel
        .replace(/green\(/g, 'color.channel($color, "green", rgb)') // Reemplaza green con color.channel
        .replace(/blue\(/g, 'color.channel($color, "blue", rgb)'); // Reemplaza blue con color.channel

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Actualizado: ${filePath}`);
}

// Actualizar todos los archivos SCSS encontrados
files.forEach(file => {
    console.log('Ruta del archivo:', file); // Mensaje de debug
    updateSassFile(file);
});

// Mensaje final
console.log('Actualización de Sass completada.');

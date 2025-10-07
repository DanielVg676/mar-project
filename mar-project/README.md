# 📸 Galería de Fotos

Una galería de fotos moderna y responsiva construida con HTML, CSS y JavaScript vanilla, utilizando la API de Unsplash para obtener imágenes de alta calidad.

## ✨ Características

- **Diseño Moderno**: Interfaz oscura con gradientes y animaciones suaves
- **Totalmente Responsivo**: Se adapta a todos los tamaños de pantalla
- **Búsqueda de Fotos**: Busca cualquier tipo de imagen
- **Categorías Predefinidas**: Naturaleza, Ciudad, Animales, Comida, Tecnología
- **Modal de Vista Previa**: Visualiza las imágenes en tamaño completo
- **Carga Infinita**: Botón "Cargar más" para ver más fotos
- **Lazy Loading**: Optimización de carga de imágenes
- **Animaciones Fluidas**: Transiciones y efectos visuales atractivos

## 🚀 Configuración

### 1. Obtener API Key de Unsplash

1. Ve a [Unsplash Developers](https://unsplash.com/developers)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Application"
4. Acepta los términos y condiciones
5. Completa la información de tu aplicación
6. Copia tu **Access Key**

### 2. Configurar el Proyecto

1. Abre el archivo `script.js`
2. Busca la línea:
   ```javascript
   const UNSPLASH_ACCESS_KEY = 'YOUR_ACCESS_KEY';
   ```
3. Reemplaza `'YOUR_ACCESS_KEY'` con tu Access Key de Unsplash

### 3. Ejecutar el Proyecto

Simplemente abre el archivo `index.html` en tu navegador web favorito.

**Opción alternativa** (servidor local):
```bash
# Si tienes Python instalado
python -m http.server 8000

# O con Node.js y npx
npx serve
```

Luego abre `http://localhost:8000` en tu navegador.

## 📁 Estructura del Proyecto

```
windsurf-project/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS con diseño moderno
├── script.js           # Lógica JavaScript y API calls
└── README.md           # Este archivo
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Grid, Flexbox y animaciones
- **JavaScript ES6+**: Lógica de la aplicación
- **Unsplash API**: Fuente de imágenes de alta calidad
- **Google Fonts**: Tipografía Poppins

## 🌟 Funcionalidades Principales

### Búsqueda
Escribe cualquier término en la barra de búsqueda y presiona Enter o haz clic en "Buscar".

### Categorías
Haz clic en cualquiera de las categorías predefinidas para ver fotos relacionadas.

### Vista Modal
Haz clic en cualquier foto para verla en tamaño completo con información del autor.

### Cargar Más
Haz clic en "Cargar más fotos" para ver más resultados.

## ⚠️ Limitaciones de la API

La API gratuita de Unsplash tiene las siguientes limitaciones:
- **50 requests por hora** para aplicaciones en desarrollo
- **5,000 requests por hora** para aplicaciones en producción (requiere aprobación)

## 🎯 Mejoras Futuras

- [ ] Implementar infinite scroll automático
- [ ] Agregar filtros por orientación y color
- [ ] Guardar fotos favoritas en localStorage
- [ ] Descargar imágenes directamente
- [ ] Modo claro/oscuro
- [ ] Compartir fotos en redes sociales

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Créditos

- Fotos proporcionadas por [Unsplash](https://unsplash.com)
- Iconos y diseño: Creación propia

---

**¡Disfruta explorando hermosas fotografías! 📸✨**

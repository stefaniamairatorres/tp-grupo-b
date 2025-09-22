¡Bienvenido a nuestra Tienda Online!
Este es el proyecto frontend de un e-commerce que creamos como trabajo final de Programación Web. La idea es que te sientas en una tienda real, pero con la magia de una Aplicación de una Sola Página (SPA) construida con React.

¿Qué podes realizar aquí?
Entrar, Registrarte y Ser Administrador: Tienes tu propio espacio para iniciar sesión o registrarte. Una vez que entras como administrador.

Gestión de Inventario (ABMC): Desde el panel de administrador, puedes dar de Alta, Baja, Modificar y Consultar productos. Y como pensamos en grande, las listas de productos tienen paginación para que sea fácil navegar por cientos de ítems.

Navegación Mágica: Gracias a React Router, pasarás de la página de inicio a la de productos, o de una categoría a otra, sin recargar la página. ¡Es una experiencia súper fluida!

Todo conectado con Hooks: Usamos los Hooks más importantes de React, como useState y useEffect, para que la aplicación funcione como un reloj suizo. Con useContext, el estado de la autenticación y el carrito está siempre al día, sin importar en qué parte de la tienda estés.

Bajo el capó (Tecnologías)
Frontend: React.js ⚛️

Navegación: react-router-dom

Peticiones a la API: axios

Estilos: Un toque de CSS para que todo se vea bonito.

Datos: Usamos la API fakestoreapi.com como si fuera nuestro propio servidor.

Despliegue: El proyecto vive en la nube gracias a Vercel/Netlify. ¡Puedes visitarlo en cualquier momento!

Colaboración: Nuestro código está en GitHub, donde usamos Git para trabajar en equipo de manera organizada.

Estructura del Proyecto
La organización es clave para un buen trabajo en equipo. Así es como ordenamos nuestras carpetas:

/src
├── components
├── context
├── pages
├── services
├── App.jsx
└── main.jsx
Cómo ponerlo a correr en tu computadora
¡Es muy fácil! Sigue estos tres pasos para tener el proyecto funcionando en tu máquina:

Clona este repositorio:
git clone https://github.com/stefaniamairatorres/tp-grupo-b.git


Estructura Detallada del Proyecto:

Nuestro proyecto está organizado de manera que cada carpeta tiene una responsabilidad clara, lo que facilita el desarrollo y la colaboración.

/src
├── assets/                  # Archivos estáticos como imágenes y fuentes.
├── components/              # Componentes de React reutilizables en toda la app.
│   ├── Header.jsx           # La barra de navegación principal.
│   ├── ProductCard.jsx      # La tarjeta de producto que se usa en varias páginas.
│   └── ProductForm.jsx      # Formulario para agregar/editar productos en el panel de admin.
├── context/                 # Archivos de React Context para el estado global.
│   ├── AuthContext.jsx      # Maneja el estado de autenticación (login/logout).
│   ├── CartContext.jsx      # Gestiona el estado del carrito de compras.
│   └── SearchContext.jsx    # Almacena el término de búsqueda.
├── pages/                   # Componentes principales que representan las "pantallas" o rutas de la app.
│   ├── AdminPage.jsx        # Panel de control para administradores (módulo ABMC).
│   ├── CartPage.jsx         # Muestra los productos en el carrito.
│   ├── CategoryPage.jsx     # Muestra los productos de una categoría específica.
│   ├── ContactPage.jsx      # Página de contacto.
│   ├── HomePage.jsx         # Página de bienvenida y lista de categorías.
│   ├── LoginPage.jsx        # Interfaz de inicio de sesión.
│   ├── ProductPage.jsx      # Lista de todos los productos (con paginación).
│   └── RegisterPage.jsx     # Interfaz de registro de usuario.
├── services/                # Módulos para la lógica de conexión a APIs.
│   └── productService.js    # Funciones para obtener datos de productos de la API externa.
├── App.jsx                  # El componente principal que maneja las rutas de la app.
└── main.jsx                 # El punto de entrada de la aplicación.

Instala las dependencias:
npm install

Inicia el servidor:
npm run dev

Nuestro Equipo:

Torres Maira Stefania

Faliveni Analia

Millapan Damian Alejandro

Casafus Franco Miguel

La Fuente Joel

Arevalos Fabas Leila Abigail

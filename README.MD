# E-Commerce de Bebidas y Coctelería: Frontend

## ¡Bienvenidos a la Tienda Online!

Este es el proyecto frontend de un e-commerce que creamos como **Trabajo Final Integrador de Programación Web**. Nuestro objetivo fue simular una tienda real con la magia de una Aplicación de una Sola Página (SPA) construida con **React**.

### ✨ ¿Qué podés realizar aquí?

-   **Entrar, Registrarte y Ser Administrador:** Tienes tu propio espacio para iniciar sesión o registrarte. Una vez que entras como administrador, se desbloquea el módulo de gestión.
-   **Gestión de Inventario (ABMC):** Desde el panel de administrador, puedes dar de **Alta, Baja, Modificar y Consultar** productos y categorías. ¡Las listas de productos tienen paginación para que sea fácil navegar por cientos de ítems!
-   **Navegación Mágica:** Gracias a React Router, pasarás de la página de inicio a la de productos, o de una categoría a otra, sin recargar la página. ¡Es una experiencia súper fluida!
-   **Todo conectado con Hooks:** Usamos los Hooks de React (`useState`, `useEffect`, `useContext`) para que la aplicación funcione como un reloj. El estado de la autenticación y el carrito está siempre al día.

### 🛒 Estado del Carrito (Pendiente de Conexión Final)

Hemos implementado la **lógica base del carrito** (`CartContext`) con las funciones de `addToCart`, `removeFromCart` y cálculo de totales.

**Estado Actual:** La gestión de productos en el carrito funciona 100% en el frontend.
**Próximo Paso:** Falta conectar el botón de "Finalizar Compra" con el *endpoint* de `POST /api/purchases` del Backend para persistir la transacción y actualizar el stock.

---

## Bajo el Capó (Tecnologías)

| Componente | Tecnología | Uso Principal |
| :--- | :--- | :--- |
| **Frontend** | **React.js ⚛️** | Biblioteca principal de UI. |
| **API/Datos** | **axios** | Peticiones HTTP al Backend (Express). |
| **Navegación** | `react-router-dom` | Manejo de rutas SPA. |
| **Estado** | `useContext` | Gestión global del Carrito y la Autenticación. |
| **Estilos** | **CSS Modular** | Estilos por componente para un código limpio. |

El código fuente completo está en GitHub.

## Estructura Detallada del Proyecto

/src ├── assets/ # Archivos estáticos como imágenes y fuentes. ├── components/ # Componentes de React reutilizables (ProductCard, Header, etc.). ├── context/ # Archivos de React Context (AuthContext, CartContext, etc.). ├── pages/ # Componentes principales (rutas) de la app (AdminPage, CartPage, HomePage). ├── services/ # Módulos para la lógica de conexión a la API. ├── App.jsx # El componente principal que maneja las rutas de la app. └── main.jsx # El punto de entrada de la aplicación (montaje de React).


## Cómo Ponerlo a Correr

¡Es muy fácil! Asegúrate de que el **Backend esté activo** (`npm start` en la carpeta backend) y sigue estos tres pasos:

1.  **Clona este repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```


## Equipo

-   Torres Maira Stefania.
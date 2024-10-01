Prueba para el servidor de la hackaton Nasa app chanllenge
sudo apt-get update

sudo apt-get install -y wget

wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

dotnet new webapi -o NASA


ME GUSTA ESTA ESTRUCTURA DE CARPETAS!!!!!

/mi-proyecto
│
├── /api                    # Carpeta para el proyecto de la API en C#
│   ├── /Controllers        # Controladores de la API
│   ├── /Models             # Modelos de datos
│   ├── /Services           # Lógica de negocio y servicios
│   ├── /Properties          # Propiedades del proyecto (ej. archivos de configuración)
│   ├── appsettings.json    # Configuración de la aplicación
│   └── Startup.cs          # Clase de configuración de la API
│
├── /frontend               # Carpeta para el proyecto frontend
│   ├── /css                # Archivos CSS
│   ├── /js                 # Archivos JavaScript
│   ├── /assets             # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── index.html          # Archivo principal HTML
│   └── script.js           # Archivo principal de JavaScript
│
├── /docs                   # Documentación del proyecto
│   └── README.md           # Archivo de documentación principal
│
└── /tests                  # Carpeta para pruebas
    ├── /api                # Pruebas para la API
    └── /frontend           # Pruebas para el frontend

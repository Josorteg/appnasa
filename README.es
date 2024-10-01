Prueba para el servidor de la hackaton Nasa app chanllenge
sudo apt-get update

sudo apt-get install -y wget

wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

dotnet new webapi -o NASA
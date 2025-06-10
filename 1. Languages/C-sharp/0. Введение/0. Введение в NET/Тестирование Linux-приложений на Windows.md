#lang #lang-c_sharp

# Тестирование Linux-приложений на Windows

**WSL** (Windows Subsystem for Linux) - позволяет разработчикам запускать окружение GNU/Linux (и ряд приложений Linux). // Windows 10 (2004)+

### Установка:
1. `wsl --install` - подключает функци WSL и устанавливает Linux (по умолчанию - Ubuntu).
2. Устанавливаем лог и пароль для админа.
3. Переключаемся на **bash** Ubuntu в ком.строке.
4. Добавим репозиторий пакетов microsoft для нужной версии убунты (22.04 в примере): 
	```bash
	wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
	sudo dpkg -i packages-microsoft-prod.deb
	rm packages-microsoft-prod.deb
	```
5. Ставим .NET SDK 8:
	```bash
	sudo apt-get update
	sudo apt-get install -y dotnet-sdk-8.0
	```
	- Проверка - `dotnet --list-sdks`

### Команды:
`explorer.exe .` - открытие каталога в проводнике.
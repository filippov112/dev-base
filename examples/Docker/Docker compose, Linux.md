#example #tool-docker

---
#### 1. **Docker Engine**
Docker Compose требует наличия Docker Engine на вашей системе. 
Если у вас уже установлен Docker Engine, можете перейти к следующему шагу. 
Если же у вас нет Docker Engine, выполните команды:

---
1. Обновите индекс пакетов:
	```bash
	sudo apt update
	```
2. Установите пакеты, необходимые для добавления новых репозиториев через HTTPS:
	```bash
	sudo apt install apt-transport-https ca-certificates curl software-properties-common
	```
3. Добавьте официальный GPG-ключ Docker:
	```bash
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
	```
4. Установите стабильный репозиторий Docker:
	```bash
	echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	```
5. Обновите индекс пакетов снова:
	```bash
	sudo apt update
	```
6. Установите Docker Engine и его зависимости:
	```bash
	sudo apt install docker-ce docker-ce-cli containerd.io
	```
7. Убедитесь, что сервис Docker запущен:
	```bash
	sudo systemctl start docker
	```
8. Добавьте текущего пользователя в группу docker, чтобы запускать команды Docker без использования `sudo`:
	```bash
	sudo usermod -aG docker $USER
	```
9. После этого перезапустите систему или выйдите из текущей сессии и снова войдите.

#### 2. **Docker Compose**
1. Сначала установите зависимости для Docker Compose:
	```bash
	sudo apt install libffi-dev libssl-dev
	sudo apt install python3 python3-pip
	sudo apt install -y python3-dev
	```
	```bash
	sudo apt remove docker-compose
	sudo pip3 uninstall docker-compose
	```
2. Установите Docker Compose с помощью `pip3`:
	```bash
	sudo pip3 install docker-compose
	```
3. Проверьте, что Docker Compose успешно установлен:
	```bash
	docker-compose --version
	```
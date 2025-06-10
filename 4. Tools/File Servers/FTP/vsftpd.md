  

# Установка и настройка vsftpd на Linux:

Существует несколько способов развернуть FTP-сервер на Linux, но наиболее распространенный метод заключается в использовании сервера **vsftpd**.
1. Установка
```bash
sudo apt update
sudo apt install vsftpd
```
2. Настройка vsftpd. Путь к файлу конфигурации: `sudo nano /etc/vsftpd.conf`
> **allow_anonymous_ftp:** Установите значение `no`, чтобы отключить анонимный доступ.
> **local_user_map:** Добавьте пользователей и пароли для локальных пользователей.
> **write_permission:** Установите значение `yes`, если вы хотите, чтобы пользователи могли записывать файлы на сервер.
> **chroot_local_user:** Установите значение `yes`, чтобы ограничить доступ пользователей своей домашней папкой.
3. Запуск и включение:
```bash
sudo systemctl start vsftpd
sudo systemctl enable vsftpd
```

## Ссылки
- [https://www.youtube.com/watch?v=T7H64aSi_L4](https://www.youtube.com/watch?v=T7H64aSi_L4)

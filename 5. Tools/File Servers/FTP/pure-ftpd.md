#tool #tool-file_server

---
1. Установка и запуск
```bash
sudo apt update && sudo apt upgrade
sudo apt install -y build-essential libssl-dev libpam-dev

wget https://releases.pureftpd.org/pub/pureftpd/releases/1.5.3/pure-ftpd-1.5.3.tar.gz
tar -xzvf pure-ftpd-1.5.3.tar.gz
cd pure-ftpd-1.5.3

./configure
make install

```

2. Создание пользователя FTP:
```bash
adduser -d /home/ftp ftpuser
```

3. Настройте Pure-ftpd:
```bash
cp /etc/pure-ftpd/conf/pure-ftpd.conf /etc/pure-ftpd/conf/pure-ftpd.conf.bak
nano /etc/pure-ftpd/conf/pure-ftpd.conf
```

```
# TLS сертификат
CertFile /path/to/your/certificate.pem
TLSCipherFile /path/to/your/ciphers.pem
TLSProtocol TLSv1.2
```

4. Запуск и настройка Pure-ftpd:
```Bash
sudo systemctl start pure-ftpd
```
- Включение Pure-ftpd в автозагрузку:
```
sudo systemctl enable pure-ftpd
```
- Проверка:
```
sudo systemctl status pure-ftpd
```
#### Важно:
>[!note]
Убедитесь, что вы открыли необходимые порты в брандмауэре для доступа к FTP-серверу извне.

5. Тестирование FTP-сервера с помощью любого клиента:
    - Адрес сервера: localhost
    - Имя пользователя: ftpuser
    - Пароль, который вы установили при создании пользователя

## Дополнительно:
- **Виртуальные серверы:** Pure-ftpd может быть настроен для поддержки нескольких виртуальных FTP-серверов, каждый из которых имеет свои собственные настройки пользователей и каталогов.
- **SSL/TLS:** Pure-ftpd можно настроить для использования SSL/TLS для безопасной передачи данных.
- **Контроль доступа:** Pure-ftpd позволяет настроить контроль доступа на основе IP-адресов, доменов и пользователей.

#### Ссылки:
- [https://www.pureftpd.org/project/pure-ftpd/doc/](https://www.pureftpd.org/project/pure-ftpd/doc/)
- [https://www.youtube.com/watch?v=O2nwKsOMfRg](https://www.youtube.com/watch?v=O2nwKsOMfRg)
- [https://habr.com/ru/articles/128117/](https://habr.com/ru/articles/128117/)


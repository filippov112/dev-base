#tool #tool-web_server

---
Модульный веб-сервер. Сам по себе может запускать только простейшие сайты html+css+js. Является многопоточным, т.е. на каждого пользователя создается отдельный поток.

#### Установка
```
apt install apache2
systemctl apache2 start/stop # - рестарт всего демона
apachectl start/stop/restart/status/gracefull # - рестарт внутри демона; gracefull - мягкий рестарт без отключения юзеров
systemctl start apache2@my-domain.com # - пример работы с одним сайтом, если на сервере их несколько, чтобы не запускать всё сразу. (отдельный домен)
```

#### Передача прав
```
sudo chown -R $USER:$USER /var/www/<каталог_сайта> # - рут права для других пользователей
sudo chmod 755 /var/www/<каталог_сайта> # - доступ
```

- По умолчанию запускает сайт-заглушку на localhost:80 
- Для https нужен SSL сертификат (open-ssl - для локального сервера, или от регистратора - для публичного)
- Главный каталог для сайта по умолчанию - `/var/www/`  (`/var/www/<домен>/index.html`)
- Виртуальные хосты Apache можно использовать для размещения нескольких веб-сайтов на одном сервере, используя разные порты, доменные имена и каталоги документов.

## Каталоги `/etc/apache2/`
- *apache2.conf* - главный
- *envvars* - глоб. переменные (пути например)
- *magic* - указатель MIME-типов файлов
- *ports.conf* - порты прослушки (80, 443)
- *conf-available/* - Хранилище дополнительных файлов конфигурации, которые могут быть включены в Apache2. (000-default.conf - дефолтный, <название_каталога_сайта>.conf - пользовательские)
- *conf-enabled/*
- *mods-available/* - модули
- *mods-enabled/*
- *sites-available/* - Хранилище дополнительных файлов конфигурации виртуальных хостов
- *sites-enabled/*

### Конфиги `conf-available/, conf-enabled/; sites-available/, sites-enabled/`
#### Пример конфига сайта (sites-available)
```apache
<VirtualHost *:80>
    ServerAdmin admin@example.com
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
**Параметры:**
- *ServerAdmin:* admin@example.com - адрес электронной почты администратора сервера, на который будут отправляться сообщения об ошибках.
- *ServerName:* example.com - доменное имя, которое будет обслуживаться этим виртуальным хостом.
- *ServerAlias:* www.example.com - псевдоним для основного доменного имени.
- *DocumentRoot:* /var/www/example.com - путь к каталогу на сервере, где хранятся файлы веб-сайта.
- *ErrorLog:* ${APACHE_LOG_DIR}/error.log - путь к файлу журнала ошибок.
- *CustomLog:* ${APACHE_LOG_DIR}/access.log combined - путь к файлу журнала доступа, который будет содержать записи в формате combined.

#### Включение/отключение конфигов
1. Отключаем дефолтный конфиг сайта `sudo a2dissite 000-default.conf`
2. Включаем свой `sudo a2ensite <имя_каталога>.conf` (создается симлинк в site-enabled)
Тем же образом работают модули и конфиги хостов (a2dismod, a2disconf, a2enmod, a2enconf)
- Проверка конфигов `sudo apache2ctl configtest` (проверяет все конфиги сразу, если нормально выдает syntax ok)
3. Перезапускаем апач.

### Модули `mods-available/, mods-enabled/`
*mod_security*  — рулсеты против атак
*mod_rewrite*  — правила для редиректов
*mod_deflate*  — сжатие данных
*mod_cache*  — кэширование данных
*mod_proxy, mod_proxy_balancer, mod_ssl*
*mod_python, mod_php5, mod_mono, mod_aspdotnet, mod_cgi*

#### Включение/отключение
- a2dismod, a2enmod


## Резолв (назначение домена) хоста
- Если только для сервера, то на сервере в `/etc/hosts` добавить строку вида `127.0.1.1 my-domen.com`
- Если для локальной сети, то нужно настраивать DNS-сервер.
- Если для глобальной сети, то нужно делать через ddns или провайдера.
## Ссылки
http://httpd.apache.org/docs/2.4/ - документация 
https://httpd.apache.org/docs/2.4/mod/ - модули
#devops #FileServices 

## FTP протокол
>FTP (File Transfer Protocol) - это сетевой протокол, предназначенный для передачи файлов между компьютерами. 
>Варианты использования:
>- **Загрузка и скачивание файлов:** 
>- **Обновление программного обеспечения:** 
>- **Хранение резервных копий:** 
>- **Доступ к удаленным файлам:**
>
>FTP работает по принципу клиент-сервер. Это означает, что для работы FTP требуются два программных обеспечения:
>Популярные клиенты: *Windows*: FileZilla, WinSCP; *macOS*: Cyberduck, Transmit; *Linux*: FileZilla, gFTP.
>Варианты серверов: модуль для апача (mod_ftp), отдельные демоны (например, [vsftpd](4.%20Tools/File%20Servers/FTP/vsftpd.md), )
#### Что нужно для подключения:
- **Адрес сервера:** Это может быть доменное имя или IP-адрес сервера.
- **Имя пользователя** 
- **Пароль**

#### Примечания:
>[!warning]
>FTP-протокол изначально не является безопасным. Передача данных осуществляется без шифрования. Существуют более безопасные альтернативы FTP, такие как:
> - **SFTP:** Secure FTP, использует шифрование SSH для защиты передаваемых данных.
> - **FTPS:** FTP over SSL/TLS, обеспечивает шифрование и аутентификацию с помощью SSL/TLS.

#### Ссылки:
- [https://ru.wikipedia.org/wiki/FTP](https://ru.wikipedia.org/wiki/FTP)
- [https://skillbox.ru/media/code/protokol-ftp-chto-eto-takoe-i-kak-s-nim-rabotat/](https://skillbox.ru/media/code/protokol-ftp-chto-eto-takoe-i-kak-s-nim-rabotat/)
- [https://docs.selectel.ru/cloud/object-storage/tools/ftp/](https://docs.selectel.ru/cloud/object-storage/tools/ftp/)
#tool #tool-file_server

---
> Стандартное расшаривание папок по сети в windows, linux тоже ест. Выглядит как локальная/сетевая папка. Клиент-серверный.
> Сервер: **samba**
> - свободное подключение между win/unix
> - можно замаскировать под обычную папку
> - есть смысл только для локального доступа
> - много дыр безопасности
### Сервер
`apt install samba`

**файл настроек**: /etc/samba/smb.conf
```
unix charset = UTF-8 # для обработки кириллицы
workgroup = WORKGROUP # для работы в windows по умолчанию
interfaces = 192.168.0.0/24 # для разрешения доступа
\[Share]
path = /home/mysamba
writable = yes /no
guest ok = yes / no
guest only = yes / no
force create mode = 777 / 776 / 774
force directory mode = 777 / 776 /774
```

### Клиент
#### Windows
**терминал:** smbclient
**windows:** по умолчанию в сетевом окружении

#### Linux
`apt install smbclient cifs-utils`

##### Как клиентское подключение:
`smbclient '\\192.168.0.123\home\mysamba' -U user`

##### Как сетевое размещение:
**временно:** `mount -t cifs -o vers=3.0,username=user ‘\\192.168.0.123\home\mysamba' /mnt`

**постоянно:** 
1. в файле */etc/fstab* 
`//192.168.0.123/home/mysamba /mnt cifs credentials=/home/user/.smbcredentials,uid=shareduser,gid=shareduser 0 0`
2. в файле */home/user/.smbcredentials*
```
username=shareduser
password=sharedpassword
domain=WORKGROUP
```

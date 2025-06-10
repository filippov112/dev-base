  

# DLNA

> Раздаёт мультимедиа контент по сети. Выглядит в системе как спец. устройство. Клиент-серверный
> Сервер: **minidlna**
> - обнаруживается автоматически (или по адрес:порт) где угодно, где поддерживаются соответствующие форматы медиа и сетевой доступ: аудиоплееры, видеоплееры, просмотрщики изображений
> - не поддерживается в терминале

### Сервер
`apt install minidlna`
Настройки в */etc/minidlna.conf*
```
media_dir=A,/home/user/myaudio
media_dir=P,/home/user/mypictures
media_dir=V,/home/user/myvideo
media_dir=PV,/home/user/photosandvideo
db_dir=/var/cache/minidlna
log_dir=/var/log/minidlna
```
Статус можно посмотреть в браузере (localhost:8200)

### Клиент
- аудиоплееры, видеоплееры, просмотрщики изображений

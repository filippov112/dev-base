 #theory #theory-enterprice
 
---
### dhcp

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

### fixed ip

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
address 10.42.189.198
broadcast 10.42.189.207
netmask 255.255.255.240
gateway 10.42.189.193


### вкл. выкл. интерфейса
ifconfig  — увидеть текущие настройки

выключить:
ifconfig eth0 down
ifdown eth0

включить:
ifconfig eth0 up — старые настройки
ifup eth0  — считать новые
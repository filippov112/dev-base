#devops #Linux #Terminal

**Nftables** - это новый инструмент для управления межсетевым экраном в Linux, призванный заменить собой устаревший iptables.
Синтаксис nftables основан на выражениях и состоит из следующих элементов:
- *Таблицы* - используются для группировки правил, относящихся к одному семейству протоколов (например, IPv4 или IPv6).
- *Цепочки* - это наборы правил, которые применяются к определенному типу трафика (например, входящему или исходящему).
- *Правила* - определяют, что делать с пакетами, соответствующими определенным критериям.
- *Действия* - определяют, что происходит с пакетом, например, разрешить его, отклонить или перенаправить.

Структура команды - `nft [действие] [тип объекта] [конкретный объект (таблица, цепочка, правило)]`
Nftables был расчитан как инструмент для написания сложных структур правил, цепочек и таблиц. Как и в [Iptables](2.%20Knowledge/Инфраструктура/Routing/Iptables.md) здесь присутствуют <u>привязки к основным типам трафика, таблицам и цепочкам (хукам, крючкам)</u>, которые в свою очередь определяют в каком месте системы использовать правило.
В скриптах может содержаться множество таблиц с правилами, но применяться эти правила будут только в том случае, если при компилировании файла будет ясно, какому месту в системе оно принадлежит. 
>[!info] Если место можно определить по <u>названиям таблицы, цепочки и самому правилу</u>, то цепочка с этим правилом будет называться *фильтрационной*, в противном случае *базовой* и правила такие будут применены только при стороннем вызове этой цепочки из другой фильтрационной.

### Например
```
table my_table { 
	chain my_chain { 
		type filter hook input priority 1; policy drop; 
		...# тут дальше идут сами правила
	} 
}
```
**Параметры цепочки:**
- *type*: Тип таблицы. (либо указывается в качестве имени таблицы) (`filter`, `nat`, `mangle`, `bridge`, `arp` и `raw`).
- *hook*: Хук (крючок), к которому будет привязана цепочка (либо указывается в качестве имени цепочки) (`input`, `output`, `forward`, `prerouting`, `postrouting` и `local`).
- *priority*: Приоритет цепочки. Чем выше приоритет (меньше число), тем раньше будет применяться цепочка.
- *policy*: Политика цепочки по умолчанию (`accept`, `drop`, `reject` и `masquerade`).
> Объяснения каждого значения см. в [Iptables](2.%20Knowledge/Инфраструктура/Routing/Iptables.md)

### Типы трафика
- ip  — работа с ipv4 пакетами
- ip6  — работа с ipv6 пакетами
- inet  — работа и с ipv4, и с ipv6
- arp  — работа с arp пакетами
- bridge  — работа с пакетами устр.  в режиме моста

### Примеры условий:
- `iifname eth0`: *input interface* name
- `family inet`: Фильтр по *семейству* IP (IPv4 или IPv6).
- `ether saddr 44:85:00:8e:42:84`: MAC-аддресс
- `protocol tcp`: Фильтр по *протоколу* (TCP, UDP, ICMP и т.д.).
- `dport 80`: *destination port*.
- `source 192.168.1.0/24`: Фильтр по *источнику* IP-адреса.
- `ip saddr 192.168.0.1/24`: *source ip address*  
- `destination 8.8.8.8`: Фильтр по IP-*адресу* назначения.
- Время
- Кол-во пакетов
- Длина пакетов



## Шаблоны
- Показать список правил - `nft list tables/ruleset` или `nft list table <имя_таблицы>` или `nft show table <имя_таблицы>`
- Добавить таблицу, цепочку, правило - `nft add table/chain/rule <имя_объекта>` или `nft insert ...`
- Удалить - `nft delete table/chain/rule <имя_объекта>` 
- Заменить (по имени) - `nft replace rule <имя_объекта>`
- Очистить - `nft flush table/chain/rule`
- Загрузка правил из файла `nft load <имя_файла>`
- Сохранение правил в файл `nft save <имя_файла>`
---
- Переменные `set <имя_переменной> = 80` и обращение `$<имя_переменной>`
- Функции `define <название_функции>() { return ... }` и обращение `<название_функции>()`


## Примеры
```bash
#!/bin/bash

nft flush ruleset
nft add table ip filter
nft add chain ip filter INPUT { type filter hook input priority 0 \; policy accept \;}
nft add chain ip filter FORWARD { type filter hook forward priority 0 \; policy accept \;}
nft add chain ip filter output { type filter hook output priority 0 \; policy accept \;}
#----------------------INPUT------------------------
nft add rule ip filter INPUT iifname "lo" counter accept # ----------- Внутренние службы
nft add rule ip filter INPUT ip saddr 192.168.0.1/24 tcp dport 22 counter accept # ----------- SSH

# nft add rule ip filter INPUT iifname enp8s0 ip saddr 192.168.8.0/24 counter accept # ----------- Локальная сеть
nft add rule ip filter INPUT ip saddr 192.168.8.0/24 tcp dport { 21, 80, 443, 445 } counter accept 
nft add rule ip filter INPUT ip saddr 192.168.8.0/24 udp dport { 137, 138, 53, 67, 68, 123 } counter accept 

nft add rule ip filter INPUT counter drop

```


##### Полезный скрипт для мониторинга правил в реалтайм
```bash
#!/bin/bash
while true;do
	clear
	nft list ruleset
	sleep 1
done

---
chmod 755 <name_file>
```
#### Шпаргалка
https://wiki.nftables.org/wiki-nftables/index.php/Quick_reference-nftables_in_10_minutes
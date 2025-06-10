#lang #lang-python 

### Свойства классов `property`

#### Использование через методы (`property`)

```python
class Point:
    def __init__(self):
        self.__x, self.__y = 0, 0

    def __getCoords(self):     # геттер
        return self.__x

    def __setCoords(self, x):  # сеттер
        self.__x = x

    def __delCoords(self):     # деструктор аттрибута
        del self.__x

    coordsX = property(__getCoords, __setCoords, __delCoords)  # СВОЙСТВО

p1 = Point()
p1.coordsX = 1          # сеттер через свойство
print(p1.coordsX)       # геттер через свойство
del p1.coordsX          # деструктор аттрибута через свойство
```

#### Реализация через декораторы

```python
class Point:
    def __init__(self):
        self.__x, self.__y = 0, 0

    @property
    def coordsX(self):      # геттер/свойство
        return self.__x

    @coordsX.setter
    def coordsX(self, x):   # сеттер
        self.__x = x

    @coordsX.deleter
    def coordsX(self):      # деструктор аттрибута
        del self.__x
```

### Общее
Оба подхода (использование методов `property` и декораторов) позволяют создавать свойства класса, которые контролируют доступ к атрибутам `__x` и `__y` с использованием геттеров, сеттеров и деструкторов. При использовании декораторов код становится более современным и понятным, что упрощает его поддержку и чтение.

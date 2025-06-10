
# WSDL

WSDL (Web Services Description Language) — это язык описания веб-сервисов на основе XML. Он используется для описания функциональности, предоставляемой веб-сервисом, а также для определения способа взаимодействия с ним. WSDL позволяет клиентам понять, как отправлять запросы к сервису и какие данные будут возвращены.

### Основные элементы WSDL:
1. **Типы (Types)**:
   - Определяет типы данных, используемые в веб-сервисе. Обычно основан на XML Schema (XSD).

2. **Сообщения (Messages)**:
   - Описывает формат данных, передаваемых между клиентом и сервером. Сообщения могут быть входными (запрос) или выходными (ответ).

3. **Порты (Ports)**:
   - Определяет конечную точку (endpoint) веб-сервиса, то есть адрес, по которому можно обратиться к сервису.

4. **Операции (Operations)**:
   - Описывает действия, которые можно выполнить с помощью веб-сервиса. Например, получение данных или отправка запроса.

5. **Привязки (Bindings)**:
   - Указывает протокол и формат данных, используемые для взаимодействия с веб-сервисом (например, SOAP over HTTP).

6. **Сервис (Service)**:
   - Содержит список доступных портов (endpoints) для доступа к веб-сервису.

### Пример использования:
WSDL-документ используется клиентами для автоматической генерации кода, который позволяет взаимодействовать с веб-сервисом. Например, в SOAP-сервисах WSDL помогает клиенту понять, как формировать запросы и обрабатывать ответы.

### Пример WSDL:
```xml
<definitions name="HelloService"
   targetNamespace="http://www.example.com/wsdl/HelloService.wsdl"
   xmlns="http://schemas.xmlsoap.org/wsdl/"
   xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
   xmlns:tns="http://www.example.com/wsdl/HelloService.wsdl"
   xmlns:xsd="http://www.w3.org/2001/XMLSchema">

   <message name="SayHelloRequest">
      <part name="firstName" type="xsd:string"/>
   </message>
   <message name="SayHelloResponse">
      <part name="greeting" type="xsd:string"/>
   </message>

   <portType name="Hello_PortType">
      <operation name="sayHello">
         <input message="tns:SayHelloRequest"/>
         <output message="tns:SayHelloResponse"/>
      </operation>
   </portType>

   <binding name="Hello_Binding" type="tns:Hello_PortType">
      <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
      <operation name="sayHello">
         <soap:operation soapAction="sayHello"/>
         <input>
            <soap:body encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" use="encoded"/>
         </input>
         <output>
            <soap:body encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" use="encoded"/>
         </output>
      </operation>
   </binding>

   <service name="Hello_Service">
      <port name="Hello_Port" binding="tns:Hello_Binding">
         <soap:address location="http://www.example.com/HelloService"/>
      </port>
   </service>
</definitions>
```

### Где используется:
- В SOAP-веб-сервисах для описания интерфейсов.
- Для автоматической генерации клиентских библиотек.
- Для документирования веб-сервисов.

WSDL является важным инструментом в мире веб-сервисов, особенно в SOAP, но с развитием RESTful API его использование стало менее распространенным.

### Outer links:


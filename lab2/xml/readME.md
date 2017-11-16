# XML schema

## Reikia parašyti XML Schema dokumentą, apibrėžiantį jūsų sukurto XML dokumento struktūrą, kuriame būtų jūsų pačių susikurti:

### 1.Paprastas tipas, apribojantis kokį nors Schema standartinį tipą

```xml
<xs:simpleType name="auditorijaType">
    <xs:restriction base="xs:string">
        <xs:pattern value="[0-9]+[a-zA-Z]?"/>
    </xs:restriction>
</xs:simpleType>
```

### 2.Prasmingas sąrašo tipas (list type). Neprasmingo sąrašo tipo pavyzdys: sąrašas iš string tipo elementų. Neprasmingas todėl, kad jį galima pakeisti vienu paprastu tipu: string

užduotis su kelias įverčiais:

```xml
<xs:simpleType name="įvertisType">
    <xs:list itemType="xs:decimal"/>
 </xs:simpleType>
```

### 3.Sudėtingi tipai su paprastu turiniu:

#### 1.išvesti apribojimu (restriction) iš jūsų (ne XML Schema) bazinio tipo

bazinis:
```xml
 <xs:simpleType name="žmogusType">
    <xs:restriction base="xs:string">
        <xs:pattern value="([\w]+)(\s\w\.)*\s([\w]+)"/>
    </xs:restriction>
</xs:simpleType>
```

išvestas:
```xml
<xs:complexType name="žmogusSuLaipsiuType">
    <xs:simpleContent>
        <xs:extension base="žmogusType">
            <xs:attribute name="laipsnis" type="xs:string"/>
        </xs:extension>
    </xs:simpleContent>
</xs:complexType>
```

#### 2.išvesti praplėtimu (extension) iš jūsų bazinio tipo

bazinis:
```xml
<xs:complexType name="žmogusSuLaipsiuType">
    <xs:simpleContent>
        <xs:extension base="žmogusType">
            <xs:attribute name="laipsnis" type="xs:string"/>
        </xs:extension>
    </xs:simpleContent>
</xs:complexType>
```

išvestas:
```xml
<xs:complexType name="profesoriusType">
    <xs:simpleContent>
        <xs:restriction base="žmogusSuLaipsiuType">
            <xs:attribute name="laipsnis" type="xs:string" use="required"/> 
        </xs:restriction>
    </xs:simpleContent>
</xs:complexType>
```

### 4.Sudėtingi tipai su sudėtingu turiniu:

#### 1.išvesti apribojimu (restriction) iš jūsų bazinio tipo

bazinis:
```xml
 <xs:complexType name="genericPaskaitaType">
        <xs:sequence>
            <xs:element name="paskaitosVieta" type="paskaitosVietaType" minOccurs="0"/>
        </xs:sequence>
    </xs:complexType>
```

išvestas:
```xml
<xs:complexType name="genericPaskaitaSuVietaType">
    <xs:complexContent>
        <xs:restriction base="genericPaskaitaType">
            <xs:sequence>
                <xs:element name="paskaitosVieta" type="paskaitosVietaType" minOccurs="1"/>
            </xs:sequence>
        </xs:restriction>
    </xs:complexContent>
</xs:complexType>
```

#### 2.išvesti praplėtimu (extension) iš jūsų bazinio tipo

bazinis:
```xml
<xs:complexType name="genericPaskaitaType">
    <xs:sequence>
        <xs:element name="paskaitosVieta" type="paskaitosVietaType" minOccurs="0"/>
    </xs:sequence>
</xs:complexType>
```

išvestas:
```xml
<xs:complexType name="pratybosType">
    <xs:complexContent>
        <xs:extension base="genericPaskaitaType">
            <xs:sequence>
                <xs:element name="dėstytojas" type="žmogusSuLaipsiuType" minOccurs="0"/>
                    <xs:element name="užduotys" type="užduotysType">
                    <xs:key name="užduotisKey">
                        <xs:selector xpath="užduotis"/>
                        <xs:field xpath="numeris"/>
                    </xs:key>
                     <xs:keyref name="užduotisKeyRef" refer="užduotisKey">
                        <xs:selector xpath="užduotis/numeris"/>
                        <xs:field xpath="@tesinioNr"/>
                    </xs:keyref>
                </xs:element>
            </xs:sequence>
        </xs:extension>
    </xs:complexContent>
</xs:complexType>
```

### 5.Pademonstruoti apribojimo principą - parodyti pavyzdį, kai apribojimo principas pažeistas, ir žinoti, kaip reikia pataisyti pavyzdį

Validacija vyksta nuo bazinio tipo hierarchiškai einant žemyn

### 6.Sudėtingas tipas su mišriu turiniu

```xml
<xs:complexType name="deadlineStringType" mixed="true">
    <xs:all>
         <xs:element name="data" type="xs:date"/>
    </xs:all>
</xs:complexType>
```

### 7.Choice valdymo struktūra

```xml
<xs:choice>
    <xs:element name="deadlineString" type="deadlineStringType"/>
    <xs:element name="deadline" type="xs:date"/>
</xs:choice>
```

### 8.Bent viena nuoroda (keyref) į unikalumo ribojimą (unique) arba raktą (key)

```xml
<xs:complexType name="pratybosType">
    <xs:complexContent>
        <xs:extension base="genericPaskaitaType">
            <xs:sequence>
                <xs:element name="dėstytojas" type="žmogusSuLaipsiuType" minOccurs="0"/>
                <xs:element name="užduotys" type="užduotysType">
                    <xs:key name="užduotisKey">
                        <xs:selector xpath="p:užduotis"/>
                        <xs:field xpath="p:numeris"/>
                    </xs:key>
                    <xs:keyref name="užduotisKeyRef" refer="užduotisKey">
                        <xs:selector xpath="p:užduotis/p:numeris"/>
                        <xs:field xpath="@tesinioNr"/>
                    </xs:keyref>
                </xs:element>
            </xs:sequence>
        </xs:extension>
    </xs:complexContent>
</xs:complexType>
```

### 9.Visi jūsų susikurti tipai turi priklausyti jūsų vardų sričiai

```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="https://mif.vu.lt/lt3/"
           targetNamespace="https://mif.vu.lt/lt3/" xmlns:p="https://mif.vu.lt/lt3/"
           elementFormDefault="qualified">
```


```xml
<tvarkaraštis xmlns="https://mif.vu.lt/lt3/"
xmlns:xs="http://www.w3.org/2001/XMLSchema-instance"
xs:schemaLocation="https://mif.vu.lt/lt3/tvarkaraštis.xsd">

```
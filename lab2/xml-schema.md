# XML schema

## 1.Paprastas tipas, apribojantis kokį nors Schema standartinį tipą.

```xml
<xs:simpleType name="auditorijaType">
    <xs:restriction base="xs:string">
        <xs:pattern value="[0-9]+[a-zA-Z]?"/>
    </xs:restriction>
</xs:simpleType>
```

## 2.Prasmingas sąrašo tipas (list type). Neprasmingo sąrašo tipo pavyzdys: sąrašas iš string tipo elementų. Neprasmingas todėl, kad jį galima pakeisti vienu paprastu tipu: string.

užduotis su kelias įverčiais

```xml
<xs:simpleType name="įvertisType">
    <xs:list itemType="xs:decimal"/>
 </xs:simpleType>
```

## 3.Sudėtingi tipai su paprastu turiniu:

### 1.išvesti apribojimu (restriction) iš jūsų (ne XML Schema) bazinio tipo.

bazinis:
```xml
 <xs:simpleType name="žmogusType">
    <xs:restriction base="xs:string">
        <xs:pattern value="([\w]+)(\s\w\.)*\s([\w]+)"/>
    </xs:restriction>
</xs:simpleType>
```

išvestas
```xml
<xs:complexType name="žmogusSuLaipsiuType">
    <xs:simpleContent>
        <xs:extension base="žmogusType">
            <xs:attribute name="laipsnis" type="xs:string"/>
        </xs:extension>
    </xs:simpleContent>
</xs:complexType>
```

### 2.išvesti praplėtimu (extension) iš jūsų bazinio tipo.

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

išvestas
```xml
<xs:complexType name="profesoriusType">
    <xs:simpleContent>
        <xs:restriction base="žmogusSuLaipsiuType">
            <xs:attribute name="laipsnis" type="xs:string" use="required"/> 
        </xs:restriction>
    </xs:simpleContent>
</xs:complexType>
```

## 4.Sudėtingi tipai su sudėtingu turiniu:

### 1.išvesti apribojimu (restriction) iš jūsų bazinio tipo

### 2.išvesti praplėtimu (extension) iš jūsų bazinio tipo

## 5.Pademonstruoti apribojimo principą - parodyti pavyzdį, kai apribojimo principas pažeistas, ir žinoti, kaip reikia pataisyti pavyzdį.

## 6.Sudėtingas tipas su mišriu turiniu,

## 7.Choice valdymo struktūra,

## 8.Bent viena nuoroda (keyref) į unikalumo ribojimą (unique) arba raktą (key)

## 9.Visi jūsų susikurti tipai turi priklausyti jūsų vardų sričiai


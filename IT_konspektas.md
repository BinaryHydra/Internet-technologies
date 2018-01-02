# IT konspektas

## XML

### Žymių sąvokos

```xml
<autorius>Jonas Jonaitis</autorius>
<knyga kalba="lt">
```

* Duomuo - *Jonas Jonaitis*, *lt*
* Duomens aprašas - *autorius*, *knyga*
* Skirtukai - *<*, *>*, *=*

### Reikalavimai

* žymių ir atributų pavadinimai - be tarpų
* žymėje negali būti atributų su tais pačiais pavadinimais (gali skirtis vardų sritys)
* tik viena šakninė žymė
* žymės padavinimas turi prasideti raide, _ arba :
* žymės padavinime galima naudoti raides, skaičius, . , - , _ ir :

### Vardų sritys

```xml
<book xmlns:bk="http://loc.gov/books">
  <bk:title bk:language="en">Introduction to XML</bk:title>
</book>
```

* *bk* - prefiksas (sutrumpintas vardas)
* *http://loc.gov/books*  - vardų strities vardas
* *http://loc.gov/books:title*, *http://loc.gov/books:language* - kvalifikuoti (tikri) vardai
* *book* neturi vardų strities

Vardų sritis galioja tik žymės viduje ir vaikuose  (galioja ir vardų sričiai pagal nutylėjimą (*xmlns=*) )
Atributams vardų sritis pagal nutylėjimą negalioja.

Atributų unikalumas

```xml
<x xmlns:n1="http://www.w3.org" xmlns:n2="http://www.w3.org" xmlns:n3="http://www.vu.lt" xmlns="http://www.vu.lt">
    <blogai a="1" a="2"/>
    <blogai n1:a="1" n2:a="2"/>
    <gerai a="1" b="2"/>
    <gerai a="1" n3:a="2"/>
</x>
```

## XPath

* ```/``` šakininis mazgas
* ```/*``` šakninė žymė

### Ašys

* ancestor(-or-self) [eina atgal]
* descendant(-or-self)
* preceding(-sibling) [eina atgal]
* following(-sibling)
* self
* parent
* child
* attribute

// TODO ašių pvz

### Ašių sutrumpinimai

* ```child``` yra pagal nutylėjimą, t.y.:

   ```knyga``` == ```child::knyga```

   ```*``` == ```child::*```

* ```@``` == attribyte
* ```//``` == ```/descendant-or-self::node()/```
* ```.``` ==  ````self::node()```
* ```..``` == ```parent::node()```

### Predikatai

skaičius [2] verčiamas į [position()=2]
mazgų aibė [./@pavadinimas] - verčiamas į boolean, t.y. ar ne tuščia
string - ["a"] verčiamas į boolean ar ne "".

#### Žymių numeracija

* prasideda nuo 1
* eina gylyn (vaikai prieš brolius  )

* //knyga[1] - gražina visas pirmas knygas
* (//knyga)[1]  -gražina pirmą knygą

### Išraiškos

#### Operacijų prioritetai

1. Skliausteliai: ( ir )
2. Žingsnių skirtukas: / (tai ne dalyba!)
3. Aibių sąjungos operatorius: | (dirba tik su aibėmis)
4. Daugyba/dalyba: *, div (slankiu kableliu), mod (liekana)
5. Sudėtis/atimtis: +, - (dirba tik su skaičiais)
6. Mažiau/daugiau: <, <=, >, >= (dirba tik su skaičiais)
7. Lygu/nelygu: =, != (su aibėmis nedirba)
8. Loginis "ir": and
9. Loginis "arba": or

* Neigimas - not()
* Konstantos - true(), false()
* last() - mazgų aibės dydis
* position() - mazgo pozicija
* count() - s
* sum() - verčia mazgus į string, tada į number ir tada sudeda

#### boolean()

* aibė - tuščia == false
* skaičius - "0" ir "NaN" == false
* string - "" == false

#### string()

* aibė
  * tuščia == ""
  * kt. - imamas pirmas aibės elementas, ir jei jis
    * žymė - imami įpedinių tekstiniai laukai ir sujungiami į eilutę
    * atributas - imama reikšmė
    * tekstas - imama reikšmė
* skaičius
  * NaN = "NaN"
  * +∞ = "Infinity"
  * -∞ = "-Infinity"
  * skaičius - reikšmė
* boolean
  * true ="true"
  * false = "false"

praleistas argumentas <-> self::node()

#### number()

* string - skaičius arba NaN
* boolean - true = 1, false = 0
* aibė - string() ir tada į skaičių

praleistas argumentas <-> self::node()


#### <, <=, >, >=

* jei ne aibės - verčiamos į skaičius *number()*
* jei aibės
  * aibė ir aibė - abiejų aibių elementams - *number()*, *dekarto sandauga* ir jei bent vienas tenkina - true;
  * aibė ir skaičius - aibės elementams - *number()*, *dekarto sandauga* su skaičium ir jei bent vienas tenkina - true;
  * aibė ir string - aibės elementams ir string - *number()*, *dekarto sandauga* ir jei bent vienas tenkina true;
  * aibė ir boolean - aibė verčiama į *boolean()* (t.y. ar ne tuščia), tada abiems - *number()*;

#### !=, =

* jei ne aibės
  * jei bent vienas boolean - abu *boolean()*
  * kitaip, jei bent vienas skaičius - abu *number()*
  * kitaip abu į string()
* jei aibės
* aibė ir aibė - abiejų aibių elementams - *string()*, *dekarto sandauga* ir jei bent vienas tenkina - true;
  * aibė ir skaičius - aibės elementams - *number()*, *dekarto sandauga* su skaičium ir jei bent vienas tenkina - true;
  * aibė ir string - aibės elementams ir string - *string()*, *dekarto sandauga* ir jei bent vienas tenkina true;
  * aibė ir boolean - aibė verčiama į *boolean()* (t.y. ar ne tuščia);

#### naudinga

@id unikalumas - ```//*[@id = following::*/@id or @id=descendant::*/@id]```

mažiausios kainos knyga - ```//knyga[not(kaina > //knyga/kaina)]```


### XML schema

Žymės deklaracija -
 minOccurs, maxOccurs, default, fixed

Atributu deklaracija -
 default, fixed, use[optional, prohibited, required]

```xml
<all
maxOccurs = 1 : 1
minOccurs = (0 | 1) : 1>
Content: (annotation?, element*)
</all>
<choice
maxOccurs = (nonNegativeInteger | unbounded) : 1
minOccurs = nonNegativeInteger : 1>
Content: (annotation?, (element|choice|sequence)*)
</choice>
<sequence
maxOccurs = (nonNegativeInteger | unbounded) : 1
minOccurs = nonNegativeInteger : 1>
Content: (annotation?, (element|choice|sequence)*)
</sequence>>
```

####Simple type

``xs:string``
galima naudoti abribojimus: ``length``, ``minLength``, ``maxLength``, ``pattern``, ``enumeration``

``xs:date``, ``xs:integer``
galima naudoti abribojimus: ``pattern``, ``enumeration``, ``minInclusive``, ``minExclusive``, ``maxInclusive``, ``maxExclusive``, ``totalDigits`` (sk. kiekis),```fractionDigits``` (sk. po kablelio)

#### Turinio tipai

||Mišrus|Sudėtingas|Paprastas|Tuščias|
|---|---|---|---|---|
|Turinio rūšys|complexContent mixed=true|complexContent|simpleContent|complexContent, simpleContent|
|Gali turėti vaikinių žymių|Taip|Taip|Ne|Ne|
|Gali turėti tekstą|Taip|Ne|Taip|Ne|

Paprastas tipas išvedamas:

* apribojimu iš *complexType ((simpleContent) arba (complexContent ir minOccurs=0))* - galima apriboti žymės/atributo tipą, uždrausti atributo naudojimą
* išplėtimu iš *(simpleType arba complexType) simpleContent* - galima pridėt tik atributus

Išplečiant *complexType* žymės pridedamos tik į galą

Tuščias turinys turi tik atributus.

```xml
<xs:element name="book">
    <xs:complexType>
        <xs:attribute name="isbn" type="isbnType"/>
    </xs:complexType>
</xs:element>
```

Apribojimo principas - ribojimas tipas turi atitikti ir tėvinių tipų taisykles.  
Dviprasmiško turinio taisyklė - neturi būti kelių vienai prasidenančių žymių (sequence) choise struktūroj.  19.8 trillion  
Neprieštaringo deklaravimo taisyklė - negali būti vienodai pavadintų, bet skirtingų tipų žymių vienoj strukturoj.

#### Unikalumas

```xml
<xs:element name="knygųSąrašas" type="...">
    <xs:unique name="KnygųRibojimas">
        <xs:selector xpath="grupė/knyga"/>
        <xs:field xpath="autorius/vardas"/>
        <xs:field xpath="autorius/pavardė"/>
    </xs:unique>
</xs:element>
```

``unique`` reikšmės nerivalomos, ``key`` - privalomos  
``keyref`` turi būti paskeltas tame pačiame lygyje arba aukščiau nei ``key``/``unique``
``xpath`` gali eit tik gilyn, ir jei naudojama vardų stritis reikia naudoti prefiksus prie kievieno žingsnio ``xpath=p:grupė/p:knyga``

#### Schemos susiejimas

be vardų srities

```xml
<?xml version="1.0" encoding="UTF-8"?>
<užsakymas data="2006-02-28"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="uzsakymas.xsd">
</užsakymas>
```

su vardų sritim

<?xml version="1.0" encoding="UTF-8"?>
<užsakymas
    xmlns="http://uzsakymai.lt"
    xsi:schemaLocation="http://uzsakymai.lt uzsakymas.xsd"
    xmlns:xsi ="http://www.w3.org/2001/XMLSchema-instance">
    <prekiųSąrašas>...</prekiųSąrašas>
</užsakymas>

unqualified -  lokalioms žymėms negalioja globalus xmlns:, galioja pagal tėvinį type

```xml
<x:author xmlns:x="http://example.org/publishing">
   <name>Aaron Skonnard</name>
   <phone>(801)390-4552</phone>
</x:author>
```

qualified - lokalioms žymems galioja globalus xmlns.

```xml
<x:author xmlns:x="http://example.org/publishing">
   <x:name>Aaron Skonnard</name>
   <x:phone>(801)390-4552</phone>
</x:author>
```

Galioja dokumentams, ne schemai.

## JSON

### Duomenų tipai:

* skaičius - su kableliu arba be, galima eksponentinė išraiška(```1.0E+2```) negali būti nurodytas ```NaN```
* eilutė (string) - išskiriama "", escape simbolis - \
* boolean - ```true``` arba ```false```
* masyvas - ```[x,y,z]``` nebutinai vienodo tipo duomenys
* ```null```
* objektas ```{"x":y, "z":w}```, nesvarbi raktų tvarka ir unikalumas

## JSON schema

tie patys tipai + ```integer```

galima nurodyti kelis tipus ```"pavadinimas": { "type": ["number", "string"] }```

### Tipai

#### String

* minLength,maxLength
* pattern (regex)
* format (date-time, email, hostname, ipv4, ipv6, uri)

#### integer, number

* multipleOf (kartotinis)
* minimum, maximum, exclusiveMinimum, exclusiveMaximum

#### object
* properties ({raktas - reikšmė (tipas)})
* additionalProperties (boolean) 
* required ({sąrašas raktų})
* minProperties, maxProperties (skaičius)

#### array

* items ({ elementų ribojima pvz.: "type":})
* additionalItems (Ar leidžiami papildomi neaprašyti elementai)
* minItems, maxItems (skaičius)
* uniqueItems (boolean)

#### enum
* {"enum":[values]}
* type

### perpanaudojimas

definitions ir ref

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {
    "adresas": {
      "type": "object",
      "properties": {
        "gatvė":    { "type": "string" },
        "miestas":  { "type": "string" },
        "šalis":    { "type": "string" }
      },
      "required": ["gatvė", "miestas", "šalis"]
    }
  },
  "type": "object",
  "properties": {
    "sąskaitos_adresas": { "$ref": "#/definitions/adresas" },
    "pristatymo_adresas": { "$ref": "#/definitions/adresas" }
  }
}
```

### praplėtimas

* allOf
* anyOf
* oneOf

```json
"pristatymo_adresas": {
  "allOf": [
    // įtraukiam bazinį adresą
    { "$ref": "#/definitions/adresas" },
    // ..ir praplečiam jį pristatymo adreso specifika
    { "properties": {
        "tipas": { "enum": [ "namų", "darbo" ] }
      },
      "required": ["tipas"]
    }
  ]
}
```

``schema`` nurodo kad schema ir schemos versija (rekomentuojama)  
``id`` nurodo unikalų identifikatorių ir bazinį kelią kurio ieškos ``$ref`` (rekomenduoja url, su failu, ref ieškos tame pačiame katologe)

## HTML

pvz.:

```html
<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <title>Pirmas puslapis</title>
</head>
<body>
    HTML5 pavyzdys
</body>
</html>
```

* doctype - html versija, nusprendžiama apdorojimo režimas (90+)
* html - šakninis elementas, vaikai head ir body, atributas lang - rekomendacija lokalizacijai
* head - metaduomenys, vartotojui nematomi
* body - turinys, kuris atvaizduojamas 

### head

``title`` beveik visuomet privalomas (išskyrus iframe?)
``charset`` rekomenduojamas

### kitos žymes

* ``<h1>Skyrius<h1>``
* ``<p>Paragrafas<p>``
* ``<em>Pabrėžiamas, pasviręs <em>``
* ``<img src="paveikslesis.jpg" width="200" height="150" alt="Tekstas jei neužkraus" title="Tekstas onHover">``
* ``<a href="puslapis.html">Nuoroda</a>`` (viduje gali būti kitos žymes, veiks ant jų paspaudus)
* ``<ul> <li>Unordered</li><li>list</li><li>Nenumeruotas sąrašas</li> </ul>``
* ``<ol> <li>Ordered</li><li>list</li><li>Numeruotas sąrašas</li> </ol>``
* ``<br>`` line break


<table border="1">
    <tr>
        <th rowspan="2">Table</th>
        <th colspan="3">Header</th>
    </tr>
    <tr>
        <th>table</th>
        <th>header</th>
        <th>th/th>
    </tr>
    <tr>
        <td>table</td>
        <td>data</td>
        <td>td</td>
        <td>td</td>
    </tr>
</table>

```html
<table border="1">
    <tr>
        <th rowspan="2">Table</th>
        <th colspan="3">Header</th>
    </tr>
    <tr>
        <th>table</th>
        <th>header</th>
        <th>th/th>
    </tr>
    <tr>
        <td>table</td>
        <td>data</td>
        <td>td</td>
        <td>td</td>
    </tr>
</table>
```

###special characters

* ``&nbsp;`` non-breaking space
* ``&lt;`` less-than <
* ``&gt;`` greater-than >
* ``&amp;`` ampersand


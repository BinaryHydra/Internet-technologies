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
* *  - vardų strities vardas
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

### JSON

#### Duomenų tipai:

* skaičius - su kableliu arba be, galima eksponentinė išraiška(```1.0E+2```) negali būti nurodytas ```NaN```
* eilutė (string) - išskiriama "", escape simbolis - \
* boolean - ```true``` arba ```false```
* masyvas - ```[x,y,z]``` nebutinai vienodo tipo duomenys
* ```null```
* objektas ```{"x":y, "z":w}```, nesvarbi raktų tvarka ir unikalumas

### XML schema

Žymės deklaracija -
 minOccurs, maxOccurs, default, fixed

Atributu deklaracija -
 default, fixed, use[optional, prohibited, required]

####Simple type

```xs:string```
galima naudoti abribojimus: ```length```, ```minLength```, ```maxLength```, ```pattern```, ```enumeration```

```xs:date```, ```xs:integer```
galima naudoti abribojimus: ```pattern```, ```enumeration```, ```minInclusive```, ```minExclusive```, ```maxInclusive```, ```maxExclusive```, ```totalDigits``` (sk. kiekis),```fractionDigits``` (sk. po kablelio)

#### Turinio tipai

||Mišrus|Sudėtingas|Paprastas|Tuščias|
|---|---|---|---|---|
|Turinio rūšys|complexContent mixed=true|complexContent|simpleContent|complexContent, simpleContent|
|Gali turėti vaikinių žymių|Taip|Taip|Ne|Ne|
|Gali turėti tekstą|Taip|Ne|Taip|Ne|
|Apribojimas||| complexType ((simpleContent) arba (complexContent ir minOccurs=0))||
||||Galima apriboti žymės/atributo tipą, uždrausti atributo naudojimą||
|Išplėtimas|||(simpleType arba complexType) simpleContent||
||||Galima pridėt tik atributus||
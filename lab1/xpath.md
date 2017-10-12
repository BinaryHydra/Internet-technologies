# XPATH

### Užduotis 1.
Pasirinkti savo XML dokumente vieną žymę (turinčią bent vieną protėvį, ir bent vieną anūką), parašyti XPath kelią, unikaliai nueinantį prie tos žymės, ir prie to kelio prirašyti dar vieną žingsnį, naudojant šias ašis: ancestor, descendant, following-sibling, preceding-sibling, following, preceding, attribute (po vieną pavyzdį kiekvienai ašiai), mokėti paaiškinti rezultatą

##### Pasirinkta žymė - sekanti IT užduotis:
```
//užduotis[numeris/text() = 2][../../../@pavadinimas = "Interneto technologijos"]
```
arba trumpiau:
```
(//užduotis)[2]
```
##### Ašys:

ancestor::  
*grąžina protėvius*
```
(//užduotis)[2]/ancestor::*
```

descendant::
*grąžina palikuonius*
```
(//užduotis)[2]/descendant::*
```

*grąžina sekančius tuos pačius elementus*
following-sibling::
```
(//užduotis)[2]/following-sibling::*
```

*grąžina buvusius tuos pačius elementus*
preceding-sibling::
```
(//užduotis)[2]/preceding-sibling::*
```
*grąžina sekančius elemetus*
following::
```
(//užduotis)[2]/following::*
```

preceding::
```
(//užduotis)[2]/preceding::*
```

attribute::
```
(//užduotis)[2]/preceding::*
```
```
(//užduotis)[2]/preceding::*/attribute::*
```

### Užduotis 2.
Parašyti XPath kelią su predikatu, kurio viduje yra panaudotas XPath kelias (pvz.: rasti visas žymes A, kurių atributas x turi tokią pačią reikšmę kaip penktos dokumente žymės B atributas y; čia A, B, x, y pakeiskite į savo dokumento žymes/atributus), paaiškinti predikato veikimo principą
```
//paskaita[teorija/paskaitosVieta/@gatvė=//paskaita[@pavadinimas="Programų sistemų projektavimas"]/teorija/paskaitosVieta/@gatvė]/@*
```
### Užduotis 3.
Funkcijas count() ir sum() (pvz., suskaičiuoti, kiek yra tam tikrų žymių/atributų, susumuoti tam tikrų žymių turinį), gebėti paaiškinti, ką ir kodėl grąžina išraiška sum(//\*)šiam XML dokumentui:
 `<a\><b>2</b><c>3</c></a>` (dėstytojas pakeis XML dokumentą)
```
sum(//paskaita[@pavadinimas="Interneto technologijos"]//ivertis)
```
```
count(//paskaita[@pavadinimas="Interneto technologijos"]/užduotys/užduotis[numeris=1]/temos/tema)
```

### Užduotis 4
Operacijas <, =, + su skirtingų tipų operandais, ir paaiškinti, kaip apliekamas automatinis tipų konvertavimas (pvz. mokėti paaiškinti, kaip apskaičiuojamas išraiškos 5 < "kuku" rezultatas).
```
//numeris < 2
```
```
//paskaitosVieta/@auditorija = "303"
```
```
//not(boolean(//knygos)) + //užduotis[2]/numeris
```
### Užduotis 5.
Reikia parašyti trijų žingsnių XPath išraišką (turi būti naudojamas bent vienas predikatas ir dvi skirtingos ašys) ir į atsiskaitymą atsinešti nupieštas aibes, kurios sukuriamos kiekvieno žingsnio apdorojimo rezultate


##### Xpath išraiška:
```
//tema[./@pavadinimas="XML schema"]/preceding::*[1]/text()
```
//

### Užduotis 6.
parašyti išraišką, su operatoriumi = arba != lyginančią:
1. aibę ir skaičių,
2. aibę ir eilutę,
3. aibę ir loginę reikšmę,
4. dvi aibes

aibė ir skaičius
```
//numeris = 4
```
aibę ir eilutę,
```
//*= "2017-10-15"
```
  aibę ir loginę reikšmę,
```
//temos != false()
```
dvi aibes
```
//* = //paskaitosVieta
```
### Užduotis 7.
parašyti išraišką, su operatoriais <, > lyginančią dvi aibes ir mokėti paaiškinti atliekamus automatinius tipų konvertavimus
```
//ivertis < //numeris
```

##1. Pasirinkti savo XML dokumente vieną žymę (turinčią bent vieną protėvį, ir bent vieną anūką), parašyti XPath kelią, unikaliai nueinantį prie tos žymės, ir prie to kelio prirašyti dar vieną žingsnį, naudojant šias ašis: ancestor, descendant, following-sibling, preceding-sibling, following, preceding, attribute (po vieną pavyzdį kiekvienai ašiai), mokėti paaiškinti rezultatą

####Pasirinkta žymė - sekanti IT užduotis:
```
//užduotis[numeris/text() = 2][../../../@pavadinimas = "Interneto technologijos"]

```
arba trumpiau:
```
(//užduotis)[2]
```

ancestor
```
(//užduotis)[2]/ancestor::*
```

descendant
```
(//užduotis)[2]/descendant::*
```

following-sibling
```
(//užduotis)[2]/following-sibling::*
```

preceding-sibling
```
(//užduotis)[2]/preceding-sibling::*
```

following
```
(//užduotis)[2]/following::*
```

preceding
```
(//užduotis)[2]/preceding::*
```

attribute
```
(//užduotis)[2]/preceding::*
```
prieš tai buvusi gražino tuščia, šita bus idomesnė:

```
(//užduotis)[2]/preceding::*/attribute::*
```

2.  //paskaita[teorija/paskaitosVieta/@gatvė=//paskaita[@pavadinimas="Programų sistemų projektavimas"]/teorija/paskaitosVieta/@gatvė]/@*

3.  sum(//paskaita[@pavadinimas="Interneto technologijos"]//ivertis)
    count(//paskaita[@pavadinimas="Interneto technologijos"]//užduotys/užduotis[numeris > 1]/temos/tema)

4.  //numeris <2
    //paskaitosVieta/@auditorija = "303"
    //not(boolean(//knygos)) + //užduotis[2]/numeris

5.  //tema[./@pavadinimas="XML schema"]/preceding::*[1]/text()

6. aibė ur skaičius
  //numeris = 4
  aibę ir eilutę,
  //*= "2017-10-15"
  aibę ir loginę reikšmę,
  //temos != false()
  dvi aibes
  //* = //paskaitosVieta

7. //ivertis < //numeris
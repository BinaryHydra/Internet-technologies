# JSON Schema

## Reikia parašyti JSON Schema (draft-wright-json-schema) dokumentą, apibrėžiantį jūsų sukurto JSON dokumento struktūrą, kuriame būtų:

### 1.Panaudoti bent 4 skirtingi duomenų tipai

panaudota: ```string```, ```integer```, ```number```, ```object```, ```array```

### 2.Panaudotas enum raktažodis

```json
"gatvė": { "enum": ["Naugarduko", "Didlaukio"] }
```

### 3.Panaudoti bent 4 validacijai skirti raktažodžiai

```json
 "numeris": {
    "type": "integer",
    "minimum": 1
},
```
```json
"items": {
    "type": "string",
     "maxLength": 120
}
```
```json
"deadline": { 
    "type": "string", 
    "pattern": "^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"
},
```
```json
 "įvertis": {
    "type": "number",
    "minimum": 0.1,
    "multipleOf" : 0.1
}
```
### 4.Panaudotos bent 2 reguliarios išraikos

```json
"auditorija": {
    "type": "string",
    "pattern": "^\\d+[a-zA-Z]?$"
}
```
```json
 "pavadinimas": {
    "type": "string",
    "pattern": "^[\\w\\s]*[\\w]$"
}
```

### 5.Realizuotas schemų praplėtimas naudojantis allOf, anyOf, oneOf raktažodžiais

```json
"pratybos": {
    "allOf": [
        {"$ref": "#/definitions/teorija"},
        {
            "properties": {
                "užduotys": {"$ref": "#/definitions/užduotys"}
            },
            "required": ["užduotys"]
        }
    ]
}
```

```json
"šaltinis": {
    "anyOf": [
        {"$ref":"#/definitions/tinkalapis"},
        {"$ref":"#/definitions/knyga"}
    ]
}
```

```json
"įvertis": {
    "oneOf":[
        {"$ref": "#/definitions/įvertis"},
        {"$ref": "#/definitions/įskaita"}
    ]
}
```
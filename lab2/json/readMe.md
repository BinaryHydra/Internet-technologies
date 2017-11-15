# JSON Schema

## Reikia parašyti JSON Schema (draft-wright-json-schema-??) dokumentą, apibrėžiantį jūsų sukurto JSON dokumento struktūrą, kuriame būtų:

### 1.Panaudoti bent 4 skirtingi duomenų tipai

panaudota: ```string```, ```integer```, ```number```, ```object```, ```array```

### 2.Panaudotas enum raktažodis

```json
"gatvė": { "enum": ["Naugarduko", "Didlaukio"] }
```

### 3.Panaudoti bent 4 validacijai skirti raktažodžiai

```json
 "numeris": { "type": "integer", "minimum": 1},
```
```json
"items": { "type": "string", "maxLength": 120 }
```
```json
"deadline": { "type": "string", "format": "date"}
```
```json
"įvertis": { "type": "number", "exclusiveMinimum": 0}
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

# JSON Schema

## Reikia parašyti JSON Schema (draft-wright-json-schema-??) dokumentą, apibrėžiantį jūsų sukurto JSON dokumento struktūrą, kuriame būtų:

### 1.Panaudoti bent 4 skirtingi duomenų tipai

panaudota: ```string```, ```integer```, ```number```, ```object```, ```array```

### 2.Panaudotas enum raktažodis

```json
"gatvė": { "enum": ["Naugarduko", "Didlaukio"] }
```

### 3.Panaudoti bent 4 validacijai skirti raktažodžiai

### 4.Panaudotos bent 2 reguliarios išraikos

```json
"auditorija": {
    "type": "string",
    "pattern": "^\\d+[a-zA-Z]?$"
}
```

### 5.Realizuotas schemų praplėtimas naudojantis allOf, anyOf, oneOf raktažodžiais

### 6.Realizuotas schemų pakartotinis panaudojimas: definitions ir $ref raktažodžiai

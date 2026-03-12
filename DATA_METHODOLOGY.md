# Art Capital — Data Methodology & Source of Truth

## Documento di Riferimento

Questo documento è la **fonte di verità** per il funzionamento del sistema dati di Art Capital. Ogni componente (frontend, backend, API, agenti automatici) deve rispettare questa metodologia. Aggiornare questo file prima di modificare la logica di calcolo.

---

## 1. Flusso Dati Generale

```
[Case d'Asta] → [Scraping Automatico] → [auction_results] → [Calcolo Indici] → [price_index + api_scores]
                                              ↓
                                    [Verifica + Fonte URL]
```

Tutto parte dai **risultati d'asta reali**. Non esistono dati inventati nel sistema. Ogni numero mostrato sul sito deve essere tracciabile fino alla sua fonte originale.
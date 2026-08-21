# Justering (etter runde 9) – header ble for stor

Prompten, ordrett:

> header ble for stor, fiks det.

Kontekst: rett etter runde 9. Årsaken viste seg å være symbol-SVG-en med
glasstegningene, som brukte `hidden`-attributtet (virker ikke på
SVG-elementer) og rendret som en tom boks over topplinja. Se changeloggen
(«Justering – 2026-08-21») og commit `4c3ce3b`.

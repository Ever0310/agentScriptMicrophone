# agentScriptMicrophone

Un composant LWC Salesforce qui résout un problème concret en démo Voice : quand on déroule une NBA avec un Agent Script, il faut constamment revenir sur l'écran du Voice Call pour muter/unmuter l'appel. Ça casse le flux de démo.

`agentScriptMicrophone` reprend le comportement du composant standard `agentScript` et ajoute un bouton mute/unmute directement dans le composant, via la Voice Toolkit API — plus besoin de quitter l'écran.

## Aperçu

| `agentScriptMicrophone` (ce composant) | `agentScript` (standard) |
|---|---|
| Avatar + texte + 🎤 bouton micro + 📋 bouton copier | Avatar + texte + 📋 bouton copier |

Le bouton micro bascule entre deux états :
- **Micro actif** — icône `unmuted`, fond blanc, contour bleu
- **Micro coupé** — icône `muted`, fond bleu, icône blanche

## Installation

```bash
git clone https://github.com/Ever0310/agentScriptMicrophone
cd agentScriptMicrophone
sf project deploy start --manifest package_agentScriptMicrophone.xml --target-org <alias>
```

Le package contient :
- `agentScriptMicrophone` — LightningComponentBundle
- `agentforceIcon` — StaticResource (icône Agentforce)

## Utilisation dans un Screen Flow

1. Dans Flow Builder, chercher `agentScriptMicrophone` dans les composants personnalisés
2. Remplacer ou ajouter à côté du composant `agentScript` standard
3. Renseigner les propriétés :

| Propriété | Requis | Description | Défaut |
|---|---|---|---|
| `Script` | ✅ | Texte du script affiché | — |
| `Color` | | Couleur de la bordure | `rgb(0, 112, 210)` |
| `Size` | | Taille du texte : `small`, `medium`, `large` | `medium` |
| `Record ID` | | ID du Voice Call en cours | — |

## Notes

- Le composant suppose que le micro est **coupé au chargement** (cas standard en démo Voice). L'état est ensuite géré localement via le bouton.
- Utilise `lightning-service-cloud-voice-toolkit-api` — nécessite la capability `lightning__ServiceCloudVoiceToolkitApi` et fonctionne uniquement dans un contexte Service Cloud Voice.

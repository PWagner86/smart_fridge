# SmartFridge

Diese Anleitung beschreibt, wie man SmartFridge von Gitea herunterlädt, installiert und in einer Entwicklungsumgebung startet. Das Projekt wurde mit Vite.js erstellt.

## Voraussetzungen

- **Git**: Git sollte auf deinem Rechner installiert sein. Du kannst Git [hier](https://git-scm.com/) herunterladen.
- **Node.js und npm**: Stelle sicher, dass Node.js und npm installiert sind. Du kannst Node.js [hier](https://nodejs.org/) herunterladen, npm wird automatisch mit installiert.

## Schritte

### 1. Repository von Gitea klonen

Öffne ein Terminal und klone das Repository in ein lokales Verzeichnis. Ersetze `<URL_DES_REPOSITORY>` durch die URL des GitHub-Repositories.

```sh
git clone <URL_DES_REPOSITORY>
```

### 2. In das Projektverzeichnis wechseln

Wechsle in das Verzeichnis, das gerade geklont wurde. Ersetze <PROJEKTNAME> durch den Namen des Projektverzeichnisses.

```sh
cd <PROJEKTNAME>
```

### 3. Abhängigkeiten installieren

Installiere die notwendigen Abhängigkeiten mit npm:

```sh
npm install
```

### 4. Entwicklungsserver starten

Starte den Entwicklungsserver von Vite:

```sh
npm run dev
```

Wenn alles erfolgreich ist, solltest du eine Ausgabe sehen, die dir mitteilt, dass der Server läuft, z.B.:

```sh
  VITE vX.X.X  ready in X ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Öffne nun deinen Webbrowser und gehe zu http://localhost:3000/. Dein Vite.js-Projekt sollte jetzt in der Entwicklungsumgebung laufen.

### 5. Weitere Informationen

https://school-2.stfw.ch/pwagner/SmartFridge/wiki/?action=_pages
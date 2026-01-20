---
title: "Débuter avec l'ESP32 et PlatformIO"
date: "2024-03-15"
description: "Pourquoi l'ESP32 est le microcontrôleur roi pour l'IoT et comment le configurer avec VS Code."
tags: ["IoT", "Embedded", "ESP32", "Tutoriel"]
author: "Mehdi Mamdouh"
image: "/images/blog/esp32-intro.jpg"
---

L'**ESP32** est devenu incontournable dans le monde de l'internet des objets (IoT). Successeur du célèbre ESP8266, il apporte le Bluetooth, un double cœur et plus de puissance.

## Pourquoi choisir l'ESP32 ?

1.  **Wi-Fi & Bluetooth intégrés** : Parfait pour la domotique.
2.  **Double Cœur** : Un cœur pour le Wi-Fi, un pour votre code.
3.  **Faible Coût** : Moins de 10€ pour une carte de développement.

## Configuration avec PlatformIO

Oubliez l'IDE Arduino classique. **PlatformIO** sur VS Code est bien plus puissant.

### Étape 1 : Installation
Installez l'extension PlatformIO dans VS Code.

### Étape 2 : Nouveau Projet
Créez un projet pour votre board (ex: `doit-esp32-devkit-v1`).

```cpp
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  Serial.println("Hello ESP32!");
}

void loop() {
  // Votre code ici
}
```

C'est aussi simple que ça ! Dans les prochains articles, nous verrons comment connecter des capteurs et envoyer des données dans le cloud.

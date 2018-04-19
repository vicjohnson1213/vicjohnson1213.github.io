---
layout: post
title: SFMF
description: SFMF is a modding framework for a game called <a href="https://superflightgame.com/">Superflight</a>.
---

## Table of Contents

- Design Decisions
  - [Data Source](#data-source)
  - [Separating All Mods vs. Installed Mods](#separating-all-mods-vs-installed-mods)
  - [Reinstalling SFMF on Installed Mod Changes](#reinstalling-sfmf-on-installed-mod-changes)
  - [Mod Settings as a CSV](#mod-settings-as-a-csv)
- Unity References
  - [Unity Controller Key Codes](#unity-controller-key-codes)

---

## Data Source

Although I would love to have the mods and their data stored in a database, I decided to keep it simple with a JSON file in the SFMF repository describing each mod and some other data about SFMF.

Reasoning:

1. It's free to store files in GitHub if they're open source.
2. C# has a really solid utility for JSON serialization/deserialization.

---

## Separating All Mods vs. Installed Mods

At first, it worked great to keep an `installed` boolean on each mod in the *manifest.json* file, but that started to cause problems with the addition of local mods.

The Problem:

Mods would be loaded if they were in the `installedMods` directory. This required the actual .dll to be in the Superflight directory, which doesn't work for a local mod.

The Solution:

Maintain a file (`installedMods.txt`) that contains a list of absolute paths to all installed mods. With this, mods can be stored anywhere on a machine and loaded from that location.

The Caveat:

Now there are two files that are used to keep track of mods: `manifest.json` keeps track of all mods and their data, `installedMods.txt` keeps the path of installed mods. So there's a small amount of duplicated data and a little bit of extra work that has to happen to keep both files in sync, but it works quite well.

---

## Reinstalling SFMF on Installed Mod Changes

To prevent potential exploits, SFMF will reinstall itself any time the status of `disableScoreReporting` changes. That way players can't install SFMF then install a mod that disables score reporting.

Although this approach may slow down installing some mods, it keeps things fair no matter which mods are installed.

---

## Mod Settings as a CSV

It would've been awesome to store mod settings and controls as a JSON file, but it turns out Unity's built in JSON utilities aren't as complete as I expected. More specifically, Unity was unable to deserialize complex objects inside of an array.

At the end of the day I ended up storing settings and controls as a CSV file since it provides very easy parsing.

Here's an example settings CSV file:

```
Setting,Name,Value
Control,Name,Keyboard Key,Controller Button
```

---

## Unity Controller Key Codes

| Controller Button | KeyCode           |
|-------------------|-------------------|
| A                 | `JoystickButton0` |
| B                 | `JoystickButton1` |
| X                 | `JoystickButton2` |
| Y                 | `JoystickButton3` |
| LB                | `JoystickButton4` |
| RB                | `JoystickButton5` |
| Select            | `JoystickButton6` |
| Start             | `JoystickButton7` |
| L3                | `JoystickButton8` |
| R3                | `JoystickButton9` |

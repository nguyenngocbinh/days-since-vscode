# Days Since — VS Code Extension

Calculate the number of calendar days between a date you enter and today.

## Features

- Run **Days Since: Calculate Days Until Today** from the Command Palette.
- Accepts `YYYY-MM-DD` (e.g. `2026-08-07`) or `DD/MM/YYYY` (e.g. `07/08/2026`).
- Shows elapsed days and an inclusive count (both the start date and today counted).
- Offers to copy the elapsed-day number to the clipboard.
- Keyboard shortcut: `Ctrl+Alt+D` when an editor has focus.

## Run locally

1. Open this repository folder in VS Code.
2. Press `F5` to launch an Extension Development Host.
3. In the new window, press `Ctrl+Shift+P`.
4. Run **Days Since: Calculate Days Until Today**.
5. Enter the start date.

## Download a build

Open the **Actions** tab and select the latest successful **Build VS Code Extension** run. Download the `days-since-vscode-...` artifact, extract the archive, then in VS Code open Extensions, select the `...` menu, choose **Install from VSIX...**, and select the `.vsix` file.

## Release a version

Create and push a version tag, for example:

```bash
git tag v0.0.1
git push origin v0.0.1
```

GitHub Actions will package the extension and attach the VSIX to a GitHub Release.

## Date-counting convention

The main result is elapsed days: `today - start date`. From 2026-10-01 to 2026-10-12, the result is 11 days. The inclusive count is 12 days because it counts both dates.

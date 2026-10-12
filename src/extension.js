const vscode = require("vscode");

function parseDate(input) {
    // Accept YYYY-MM-DD or DD/MM/YYYY, with strict calendar validation.
    let year, month, day;
    const iso = input.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    const dmy = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (iso) {
        year = Number(iso[1]);
        month = Number(iso[2]);
        day = Number(iso[3]);
    } else if (dmy) {
        day = Number(dmy[1]);
        month = Number(dmy[2]);
        year = Number(dmy[3]);
    } else {
        return null;
    }

    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }
    return Date.UTC(year, month - 1, day) / 86400000;
}

function todayUtcDayNumber() {
    const now = new Date();
    return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000;
}

function activate(context) {
    const disposable = vscode.commands.registerCommand("daysSince.calculate", async () => {
        const input = await vscode.window.showInputBox({
            title: "Days Since",
            prompt: "Enter the start date. Accepted formats: YYYY-MM-DD or DD/MM/YYYY",
            placeHolder: "2026-08-07",
            ignoreFocusOut: true,
            validateInput: (value) => {
                if (!value.trim()) return "Please enter a date.";
                if (parseDate(value.trim()) === null) {
                    return "Invalid date. Use YYYY-MM-DD (e.g. 2026-08-07) or DD/MM/YYYY (e.g. 07/08/2026).";
                }
                return null;
            }
        });

        if (input === undefined) return;

        const startDay = parseDate(input.trim());
        const todayDay = todayUtcDayNumber();
        const difference = todayDay - startDay;

        const now = new Date();
        const todayLabel = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("-");

        if (difference < 0) {
            vscode.window.showWarningMessage(
                `The date ${input.trim()} is ${Math.abs(difference)} day(s) in the future (today: ${todayLabel}).`
            );
            return;
        }

        const inclusive = difference + 1;
        const message = `From ${input.trim()} to today (${todayLabel}): ${difference} day(s) elapsed. Inclusive count: ${inclusive} day(s).`;
        const action = "Copy result";
        const choice = await vscode.window.showInformationMessage(message, action);
        if (choice === action) {
            await vscode.env.clipboard.writeText(String(difference));
            vscode.window.showInformationMessage(`Copied ${difference} to clipboard.`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };

# Google Sheets integration for RSVP

## 1) Create spreadsheet columns

Create a Google Sheet with the first row:

- submittedAt
- fullName
- attendance
- transport
- drinkPreferences
- hasAllergy
- allergyDetails
- comment

## 2) Create Apps Script webhook

In Google Sheet: Extensions -> Apps Script, then paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    data.submittedAt || "",
    data.fullName || "",
    data.attendance || "",
    data.transport || "",
    data.drinkPreferences || "",
    data.hasAllergy || "",
    data.allergyDetails || "",
    data.comment || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3) Deploy script

- Deploy -> New deployment
- Type: Web app
- Execute as: Me
- Who has access: Anyone
- Copy the Web app URL

## 4) Add URL to project env

Create `.env.local` in project root:

```bash
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/...../exec
```

Restart `npm run dev` after env changes.

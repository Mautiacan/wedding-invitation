import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type RsvpEntry = {
  fullName: string;
  attendance: "Да" | "Нет";
  transport: "Самостоятельно" | "Нужен трансфер";
  drinkPreferences: string;
  hasAllergy: "Нет" | "Да";
  allergyDetails: string;
  comment: string;
  submittedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "rsvp.json");
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;
const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

const safeParse = (value: string): RsvpEntry[] => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const sendTelegramNotification = async (entry: RsvpEntry) => {
  if (!telegramToken || !telegramChatId) {
    return;
  }

  const text = [
    "Новая анкета",
    "",
    `Имя: ${entry.fullName}`,
    `Присутствие: ${entry.attendance}`,
    `Маршрут: ${entry.transport}`,
    `Предпочтения по напиткам: ${entry.drinkPreferences || "-"}`,
    `Аллергия: ${entry.hasAllergy}`,
    `Детали аллергии: ${entry.hasAllergy === "Да" ? entry.allergyDetails || "-" : "-"}`,
    `Комментарий: ${entry.comment || "-"}`,
    `Время: ${new Date(entry.submittedAt).toLocaleString("ru-RU")}`
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text
    })
  });
};

const sendGoogleSheetsNotification = async (entry: RsvpEntry) => {
  if (!googleSheetsWebhookUrl) {
    return;
  }

  await fetch(googleSheetsWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      submittedAt: entry.submittedAt,
      fullName: entry.fullName,
      attendance: entry.attendance,
      transport: entry.transport,
      drinkPreferences: entry.drinkPreferences || "-",
      hasAllergy: entry.hasAllergy,
      allergyDetails: entry.hasAllergy === "Да" ? entry.allergyDetails || "-" : "-",
      comment: entry.comment || "-"
    })
  });
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RsvpEntry>;

    if (!body.fullName || !body.attendance || !body.transport) {
      return NextResponse.json(
        { message: "Пожалуйста, заполните обязательные поля." },
        { status: 400 }
      );
    }

    const newEntry: RsvpEntry = {
      fullName: body.fullName.trim(),
      attendance: body.attendance === "Нет" ? "Нет" : "Да",
      transport: body.transport === "Нужен трансфер" ? "Нужен трансфер" : "Самостоятельно",
      drinkPreferences: body.drinkPreferences?.trim() ?? "",
      hasAllergy: body.hasAllergy === "Да" ? "Да" : "Нет",
      allergyDetails: body.hasAllergy === "Да" ? body.allergyDetails?.trim() ?? "" : "",
      comment: body.comment?.trim() ?? "",
      submittedAt: new Date().toISOString()
    };

    await fs.mkdir(dataDir, { recursive: true });

    let existing: RsvpEntry[] = [];
    try {
      const fileContent = await fs.readFile(dataFile, "utf8");
      existing = safeParse(fileContent);
    } catch {
      existing = [];
    }

    await fs.writeFile(dataFile, JSON.stringify([...existing, newEntry], null, 2), "utf8");

    // External notifications should not break RSVP saving.
    await Promise.allSettled([
      sendTelegramNotification(newEntry),
      sendGoogleSheetsNotification(newEntry)
    ]);

    return NextResponse.json({ message: "Ответ сохранен." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Не удалось сохранить ответ. Попробуйте позже." },
      { status: 500 }
    );
  }
}


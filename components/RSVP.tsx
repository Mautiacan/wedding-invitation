"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

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

export function RSVP() {
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    attendance: "Да",
    transport: "Самостоятельно",
    drinkSoft: false,
    drinkAlcoholic: false,
    alcoholChampagne: false,
    alcoholWine: false,
    wineType: "" as "" | "Белое" | "Красное",
    alcoholStrong: false,
    hasAllergy: "Нет",
    allergyDetails: "",
    comment: ""
  });

  const buildDrinkPreferences = () => {
    const selections: string[] = [];

    if (form.drinkSoft) {
      selections.push("Безалкогольные");
    }

    if (form.drinkAlcoholic) {
      const alcoholSelections: string[] = [];
      if (form.alcoholChampagne) {
        alcoholSelections.push("Шампанское");
      }
      if (form.alcoholWine) {
        alcoholSelections.push(
          form.wineType ? `Вино (${form.wineType.toLowerCase()})` : "Вино"
        );
      }
      if (form.alcoholStrong) {
        alcoholSelections.push("Крепкий алкоголь");
      }

      selections.push(
        alcoholSelections.length > 0
          ? `Алкогольные (${alcoholSelections.join(", ")})`
          : "Алкогольные"
      );
    }

    return selections.join("; ");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const payload: RsvpEntry = {
      fullName: form.fullName,
      attendance: form.attendance as "Да" | "Нет",
      transport: form.transport as "Самостоятельно" | "Нужен трансфер",
      drinkPreferences: buildDrinkPreferences(),
      hasAllergy: form.hasAllergy as "Нет" | "Да",
      allergyDetails: form.allergyDetails,
      comment: form.comment,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus(result.message ?? "Ошибка отправки формы.");
        return;
      }

      setStatus("Спасибо! Ваш ответ сохранен.");
      setForm({
        fullName: "",
        attendance: "Да",
        transport: "Самостоятельно",
        drinkSoft: false,
        drinkAlcoholic: false,
        alcoholChampagne: false,
        alcoholWine: false,
        wineType: "",
        alcoholStrong: false,
        hasAllergy: "Нет",
        allergyDetails: "",
        comment: ""
      });
    } catch {
      setStatus("Не удалось отправить форму. Проверьте подключение к интернету.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="section-divider-top pb-20 pt-12">
      <div className="section-shell">
        <h2 className="section-title text-center">Анкета</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-forest-bark/80">
          Пожалуйста, подтвердите ваше присутствие и заполните короткую анкету для комфорта
          на празднике.
        </p>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="glass-card mx-auto mt-8 grid max-w-2xl gap-4 p-6"
        >
          <label className="grid gap-2 text-sm text-forest-bark">
            Имя и Фамилия
            <input
              required
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className="rounded-xl border border-forest-bark/20 bg-white px-4 py-3 outline-none transition focus:border-forest-moss"
              placeholder="Например: Иван Иванов"
            />
          </label>

          <label className="grid gap-2 text-sm text-forest-bark">
            Присутствие
            <select
              value={form.attendance}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, attendance: e.target.value as "Да" | "Нет" }))
              }
              className="rounded-xl border border-forest-bark/20 bg-white px-4 py-3 outline-none transition focus:border-forest-moss"
            >
              <option value="Да">Да</option>
              <option value="Нет">Нет</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm text-forest-bark">
            Как планируете добираться?
            <select
              value={form.transport}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  transport: e.target.value as "Самостоятельно" | "Нужен трансфер"
                }))
              }
              className="rounded-xl border border-forest-bark/20 bg-white px-4 py-3 outline-none transition focus:border-forest-moss"
            >
              <option value="Самостоятельно">Самостоятельно</option>
              <option value="Нужен трансфер">Нужен трансфер</option>
            </select>
          </label>

          <fieldset className="grid gap-3 text-sm text-forest-bark">
            Предпочтения по напиткам
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.drinkSoft}
                onChange={(e) => setForm((prev) => ({ ...prev, drinkSoft: e.target.checked }))}
                className="h-4 w-4 rounded border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
              />
              <span>Безалкогольные</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.drinkAlcoholic}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    drinkAlcoholic: e.target.checked,
                    ...(e.target.checked
                      ? {}
                      : {
                          alcoholChampagne: false,
                          alcoholWine: false,
                          wineType: "",
                          alcoholStrong: false
                        })
                  }))
                }
                className="h-4 w-4 rounded border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
              />
              <span>Алкогольные</span>
            </label>

            {form.drinkAlcoholic && (
              <div className="ml-6 grid gap-2 text-sm text-forest-bark/90">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.alcoholChampagne}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, alcoholChampagne: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
                  />
                  <span>Шампанское</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.alcoholWine}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        alcoholWine: e.target.checked,
                        ...(e.target.checked ? {} : { wineType: "" })
                      }))
                    }
                    className="h-4 w-4 rounded border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
                  />
                  <span>Вино</span>
                </label>
                {form.alcoholWine && (
                  <div className="ml-6 grid gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="wineType"
                        value="Белое"
                        checked={form.wineType === "Белое"}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            wineType: e.target.value as "Белое" | "Красное"
                          }))
                        }
                        className="h-4 w-4 border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
                      />
                      <span>Белое</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="wineType"
                        value="Красное"
                        checked={form.wineType === "Красное"}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            wineType: e.target.value as "Белое" | "Красное"
                          }))
                        }
                        className="h-4 w-4 border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
                      />
                      <span>Красное</span>
                    </label>
                  </div>
                )}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.alcoholStrong}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, alcoholStrong: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-forest-bark/30 text-forest-moss focus:ring-forest-moss"
                  />
                  <span>Крепкий алкоголь</span>
                </label>
              </div>
            )}
          </fieldset>

          <label className="grid gap-2 text-sm text-forest-bark">
            Есть ли аллергия?
            <select
              value={form.hasAllergy}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, hasAllergy: e.target.value as "Нет" | "Да" }))
              }
              className="rounded-xl border border-forest-bark/20 bg-white px-4 py-3 outline-none transition focus:border-forest-moss"
            >
              <option value="Нет">Нет</option>
              <option value="Да">Да</option>
            </select>
          </label>

          {form.hasAllergy === "Да" && (
            <label className="grid gap-2 text-sm text-forest-bark">
              Укажите аллергию
              <textarea
                required
                value={form.allergyDetails}
                onChange={(e) => setForm((prev) => ({ ...prev, allergyDetails: e.target.value }))}
                rows={2}
                className="rounded-xl border border-forest-bark/20 bg-white px-4 py-3 outline-none transition focus:border-forest-moss"
                placeholder="Например: орехи, цитрусовые"
              />
            </label>
          )}

          <label className="grid gap-2 text-sm text-forest-bark">
            Комментарий
            <textarea
              value={form.comment}
              onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
              rows={3}
              className="rounded-xl border border-forest-bark/20 bg-white px-4 py-3 outline-none transition focus:border-forest-moss"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-forest-bark px-6 py-3 text-sm font-medium text-white transition hover:bg-forest-moss"
          >
            {isSubmitting ? "Отправляем..." : "Отправить ответ"}
          </button>

          {status && <p className="text-sm text-forest-moss">{status}</p>}
        </motion.form>
      </div>
    </section>
  );
}

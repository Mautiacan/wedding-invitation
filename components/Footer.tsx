import { EVENT_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="section-divider-top mt-4 py-10">
      <div className="section-shell text-center text-sm text-forest-bark/70">
        <p className="font-serif text-2xl text-[#2f4a2f]">{EVENT_INFO.couple}</p>
        <p className="mt-1">{EVENT_INFO.dateText}</p>
        <p className="mt-2 text-base font-medium text-forest-moss">
          Мы с нетерпением ждем нашей встречи!!!!
        </p>
      </div>
    </footer>
  );
}

import React, { useMemo, useState } from "react";
import { H2, H3, SectionHeading } from "../components/ui/Typography.jsx";
import { DividerDashed, DividerSolid, Card, LinkA } from "../components/ui/Primitives.jsx";
import { Button, Input, TextArea } from "../components/ui/Forms.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { GuideItem } from "../features/guides/GuideItem.jsx";
import { AssignmentItem } from "../features/assignments/AssignmentItem.jsx";
import { isHttpUrl, isLikelyEmail } from "../utils/validators.js";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const isValidEmail = useMemo(() => isLikelyEmail(email), [email]);

  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitFor, setSubmitFor] = useState("");
  const [hwLink, setHwLink] = useState("");
  const [hwNote, setHwNote] = useState("");
  const [hwError, setHwError] = useState(null);

  function subscribe(e) {
    e.preventDefault();
    if (!isValidEmail) { setEmailError("Укажите корректный e‑mail"); return; }
    setEmailError(null);
    alert("Спасибо! Мы прислали вам письмо с подтверждением.");
    setEmail("");
  }

  function openConsole() {
    const el = document.getElementById("console-card");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function openConsoleFromModal() { setQuickOpen(false); requestAnimationFrame(openConsole); }
  function openGuides() { setQuickOpen(false); window.location.hash = "#guides"; }

  function openSubmit(title) {
    setSubmitFor(title);
    setHwLink(""); setHwNote(""); setHwError(null);
    setSubmitOpen(true);
  }
  function submitHW(e) {
    e.preventDefault();
    if (!isHttpUrl(hwLink)) { setHwError("Добавьте ссылку на демо/репозиторий (http/https)."); return; }
    setHwError(null);
    alert(`Задание «${submitFor}» отправлено.`);
    setSubmitOpen(false);
  }

  const tests = useMemo(() => {
    const results = [];
    results.push({ name: "AssignmentItem определён", pass: typeof AssignmentItem === "function" });
    results.push({ name: "URL validator: https ok / ftp fail", pass: isHttpUrl("https://x") && !isHttpUrl("ftp://x") });
    results.push({ name: "Email эвристика includes", pass: isLikelyEmail("a@b.c") && !isLikelyEmail("bad") });
    return results;
  }, []);
  const allPass = tests.every((t) => t.pass);
  const currentModule = "ИИ — основы";

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 font-mono"
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
    >
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
.accent-link { color: #4b5563; text-decoration: none; }
.accent-link:visited { color: #4b5563; }
.accent-link:hover { color: #111827; text-decoration: underline; text-decoration-color: #111827; }
.accent-link:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
`}</style>

      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-3">
          <a href="#" className="text-sm font-bold text-black tracking-tight">AI MONO</a>
          <nav className="flex items-center gap-3 text-xs text-gray-600">
            <a className="hover:underline" href="#tools">Инструменты</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#guides">Гайды</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#assignments">Домашние</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="icon" aria-label="Справка" title="Справка" onClick={() => setModalOpen(true)}>?</Button>
            <Button onClick={() => setQuickOpen(true)}>Начать</Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6">
        {/* Текущий модуль */}
        <Card className="py-3">
          <div className="text-sm">
            <span className="text-gray-500">Текущий модуль: </span>
            <span className="font-bold text-black">{currentModule}</span>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <H2>ИИ, но проще</H2>
            <p className="text-sm text-gray-800">Чёткие инструменты и понятные гайды без визуального шума. Только то, что помогает запускать и проверять идеи быстрее.</p>
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={openConsole}>Открыть консоль</Button>
              <Button variant="secondary">Документация</Button>
            </div>
          </div>
        </Card>

        <section id="tools" className="space-y-3">
          <SectionHeading>Инструменты</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <H3>Суммаризатор</H3>
              <p className="mt-2 text-sm text-gray-800">Готовит краткие отчёты из длинных тредов и лент. Понимает разметку, теги и временные метки.</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="secondary">Открыть</Button>
                <LinkA href="#" className="text-xs">Как это работает</LinkA>
              </div>
            </Card>

            <Card id="console-card">
              <H3>Консоль запросов</H3>
              <p className="mt-2 text-sm text-gray-800">Тестируйте промпты и подсказки. Сохраняйте пресеты. Экспортируйте ответы в Markdown.</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="secondary">Открыть</Button>
                <LinkA href="#" className="text-xs">Гид</LinkA>
              </div>
            </Card>

            <Card>
              <H3>База знаний</H3>
              <p className="mt-2 text-sm text-gray-800">Индексируйте документы, выбирайте источники, настраивайте цитирование. Всё в одном месте.</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="secondary">Открыть</Button>
                <LinkA href="#" className="text-xs">Примеры</LinkA>
              </div>
            </Card>

            <Card>
              <H3>Автопроцессы</H3>
              <p className="mt-2 text-sm text-gray-800">Планируйте задачи и пайплайны: парсинг → очистка → анализ → отчёт. Запуски по расписанию.</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="secondary">Открыть</Button>
                <LinkA href="#" className="text-xs">Сценарии</LinkA>
              </div>
            </Card>
          </div>
        </section>

        <DividerDashed />

        <section id="guides" className="space-y-3">
          <SectionHeading>Гайды</SectionHeading>
          <Card className="space-y-6">
            <GuideItem title="Дневной отчёт из 300 сообщений" desc="Как собирать данные из Telegram/Discord, резюмировать и отправлять дайджест в канал." time="7 мин" />
            <DividerSolid />
            <GuideItem title="Консоль промптов: быстрые тесты" desc="Структуры промптов, фиксация контекста, быстрые A/B проверки ответов." time="5 мин" />
            <DividerSolid />
            <GuideItem title="База знаний без боли" desc="Загрузка PDF/Markdown, извлечение цитат, ссылки на источники, экспорт результатов." time="9 мин" />
          </Card>
        </section>

        <section id="assignments" className="space-y-3">
          <SectionHeading>Домашние задания</SectionHeading>
          <Card className="space-y-6">
            <AssignmentItem title="ДЗ #1 — Мини-консоль промптов" desc="Соберите простую страницу с полем ввода и кнопкой 'Run'. Добавьте пресет на 3 промпта." due="2025‑08‑17" status="Открыто" onSubmit={openSubmit} />
            <DividerSolid />
            <AssignmentItem title="ДЗ #2 — Дневной отчёт" desc="Склеить 300 сообщений в сводку: парсинг → очистка → резюме → Markdown." due="2025‑08‑24" status="Открыто" onSubmit={openSubmit} />
            <DividerSolid />
            <AssignmentItem title="ДЗ #3 — База знаний" desc="Импорт PDF+MD, поиск по источникам, список цитат с ссылками." due="2025‑08‑31" status="Скоро" onSubmit={openSubmit} />
          </Card>
        </section>

        <section id="tests" className="space-y-3">
          <SectionHeading>Тесты</SectionHeading>
          <Card className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-800">Тесты по текущему модулю</span>
              <span className={`text-xs ${allPass ? "text-gray-900" : "text-red-600"}`}>{allPass ? "Пройдены" : "Не пройдены"}</span>
            </div>
            <DividerSolid />
            {tests.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-800">{t.name}</span>
                <span className={`text-xs ${t.pass ? "text-gray-900" : "text-gray-500"}`}>{t.pass ? "OK" : "FAIL"}</span>
              </div>
            ))}
          </Card>
        </section>
      </main>

      <footer className="border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} AI MONO</p>
          <LinkA href="#" className="text-xs">Лицензия</LinkA>
        </div>
      </footer>

      <Modal open={submitOpen} onClose={() => setSubmitOpen(false)} title={`Сдать: ${submitFor || ""}`}>
        {hwError && <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{hwError}</div>}
        <form onSubmit={submitHW} className="mt-2 space-y-3">
          <Input type="url" placeholder="Ссылка на демо/репозиторий" value={hwLink} onChange={(e) => setHwLink(e.target.value)} />
          <TextArea placeholder="Комментарий (необязательно)" value={hwNote} onChange={(e) => setHwNote(e.target.value)} />
          <div className="flex gap-2">
            <Button type="submit">Отправить</Button>
            <Button type="button" variant="secondary" onClick={() => setSubmitOpen(false)}>Отмена</Button>
          </div>
        </form>
      </Modal>

      <Modal open={quickOpen} onClose={() => setQuickOpen(false)} title="Быстрый старт">
        <ol className="list-decimal list-outside pl-5 space-y-1 text-sm text-gray-800">
          <li>Откройте «Консоль запросов» и протестируйте первый промпт.</li>
          <li>Импортируйте пресеты (или сохраните свой).</li>
          <li>Пройдите гайд «Дневной отчёт из 300 сообщений».</li>
        </ol>
        <div className="mt-3 flex gap-2">
          <Button onClick={openConsoleFromModal}>Открыть консоль</Button>
          <Button variant="secondary" onClick={openGuides}>К гайду</Button>
        </div>
      </Modal>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="О дизайне">
        <p>Палитра: только серые оттенки, акценты — на hover для ссылок.</p>
        <p>Типографика: JetBrains Mono, размеры строго по системе.</p>
        <p>Глубина: границы и отступы вместо теней. Исключение — модальные окна (shadow-xl).</p>
        <DividerDashed className="my-3" />
        <p className="text-xs text-gray-500">Закройте окно, нажав ✕ или за пределами панели.</p>
      </Modal>
    </div>
  );
}



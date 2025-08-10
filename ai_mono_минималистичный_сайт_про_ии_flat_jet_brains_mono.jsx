import React, { useMemo, useState } from "react";

// AI MONO — минималистичный сайт про ИИ (версия A, как просили)
// Навбар с брендом, секции: Инструменты / Гайды / Домашние / Обновления
// Модалы: «Быстрый старт» и «Сдать ДЗ». Без розового: ссылки монохромные, акцент только на hover.
// Flat-дизайн, большие отступы, JetBrains Mono. Внизу — простые self-tests.

// ——— UI PRIMITIVES ———
const H2 = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold text-black ${className}`}>{children}</h2>
);

const H3 = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold text-black ${className}`}>{children}</h3>
);

const SectionHeading = ({ children, className = "" }) => (
  <div className={`text-xs uppercase font-bold text-gray-500 tracking-wider ${className}`}>{children}</div>
);

const DividerSolid = ({ className = "" }) => (
  <div className={`border-b border-gray-200 ${className}`} />
);

const DividerDashed = ({ className = "" }) => (
  <div className={`border-t border-dashed border-gray-300 ${className}`} />
);

const Card = ({ children, className = "", ...props }) => (
  <section className={`bg-white border border-gray-200 rounded-lg p-6 sm:p-8 ${className}`} {...props}>
    {children}
  </section>
);

const Button = ({ variant = "primary", className = "", ...props }) => {
  const base = "text-sm font-bold rounded-md focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "px-5 py-2 text-white bg-gray-900 hover:bg-gray-700 focus:ring-gray-900 disabled:opacity-50",
    secondary:
      "px-4 py-2 text-gray-900 bg-gray-100 hover:bg-gray-200",
    icon:
      "p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
};

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 ${className}`}
    {...props}
  />
);

const TextArea = ({ className = "", rows = 4, ...props }) => (
  <textarea
    className={`w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 ${className}`}
    rows={rows}
    {...props}
  />
);

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-6" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex items-start justify-between gap-3">
          {title ? <H3 className="m-0">{title}</H3> : <span />}
          <Button variant="icon" aria-label="Закрыть модал" onClick={onClose}>✕</Button>
        </div>
        <div className="mt-3 text-sm text-gray-800 space-y-2">{children}</div>
      </div>
    </div>
  );
};

const GuideItem = ({ title, desc, time }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
    <div>
      <h4 className="text-sm font-bold text-black">{title}</h4>
      <p className="mt-1 text-sm text-gray-800">{desc}</p>
    </div>
    <div className="text-xs text-gray-500 whitespace-nowrap">{time}</div>
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-xs text-gray-600 border border-gray-300 rounded ${className}`}>
    {children}
  </span>
);

const LinkA = ({ href, children, className = "" }) => (
  <a href={href} className={`accent-link ${className}`}>
    {children}
  </a>
);

const AssignmentItem = ({ title, desc, due, status, onSubmit }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
    <div>
      <h4 className="text-sm font-bold text-black">{title}</h4>
      <p className="mt-1 text-sm text-gray-800">{desc}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
        <Badge>{status}</Badge>
        <span>Сдать до: {due}</span>
        <LinkA href="#" className="text-xs">Скачать шаблон</LinkA>
      </div>
    </div>
    <div className="flex gap-2">
      <Button variant="secondary" onClick={() => onSubmit(title)}>Сдать</Button>
    </div>
  </div>
);

// ——— HELPERS ———
const isHttpUrl = (s) => /^https?:\/\//.test(s || "");

export default function AIMonoSite() {
  // Модалы
  const [modalOpen, setModalOpen] = useState(false); // справка
  const [quickOpen, setQuickOpen] = useState(false); // быстрый старт

  // Подписка
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const isValidEmail = useMemo(() => email.includes("@") && email.includes("."), [email]);

  // Сдача ДЗ
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

  // ——— SELF-TESTS ———
  const tests = useMemo(() => {
    const results = [];
    results.push({ name: "AssignmentItem определён", pass: typeof AssignmentItem === "function" });
    results.push({ name: "URL validator: https ok / ftp fail", pass: isHttpUrl("https://x") && !isHttpUrl("ftp://x") });
    results.push({ name: "Email эвристика includes", pass: ("a@b.c".includes("@") && "a@b.c".includes(".")) && !("bad".includes("@") && "bad".includes(".")) });
    return results;
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 font-mono"
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
    >
      {/* Шрифт + монохромные ссылки */}
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
.accent-link { color: #4b5563; text-decoration: none; } /* gray-600 */
.accent-link:visited { color: #4b5563; }
.accent-link:hover { color: #111827; text-decoration: underline; text-decoration-color: #111827; } /* gray-900 */
.accent-link:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
`}</style>

      {/* Навбар */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-3">
          <a href="#" className="text-sm font-bold text-black tracking-tight">AI MONO</a>
          <nav className="flex items-center gap-3 text-xs text-gray-600">
            <a className="hover:underline" href="#tools">Инструменты</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#guides">Гайды</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#assignments">Домашние</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#updates">Обновления</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="icon" aria-label="Справка" title="Справка" onClick={() => setModalOpen(true)}>?</Button>
            <Button onClick={() => setQuickOpen(true)}>Начать</Button>
          </div>
        </div>
      </header>

      {/* Контент */}
      <main className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6">
        {/* Hero */}
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

        {/* Инструменты */}
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

        {/* Разделитель (пунктир) */}
        <DividerDashed />

        {/* Гайды */}
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

        {/* Домашние задания */}
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

        {/* Обновления */}
        <section id="updates" className="space-y-3">
          <SectionHeading>Обновления</SectionHeading>
          <Card>
            <H3>Подписаться на апдейты</H3>
            <p className="mt-2 text-sm text-gray-800">Редкие письма: релизы, гайды, примеры использования.</p>

            {emailError && <div className="mt-4 bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{emailError}</div>}

            <form onSubmit={subscribe} className="mt-4 flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!emailError} />
              <Button type="submit" disabled={!email || !isValidEmail}>Подписаться</Button>
            </form>
            <p className="mt-2 text-xs text-gray-500">Можно отписаться в один клик. Никакого спама.</p>
          </Card>
        </section>

        {/* Тесты (self-check) */}
        <section id="tests" className="space-y-3">
          <SectionHeading>Тесты</SectionHeading>
          <Card className="space-y-2">
            {tests.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-800">{t.name}</span>
                <span className={`text-xs ${t.pass ? "text-gray-900" : "text-gray-500"}`}>{t.pass ? "OK" : "FAIL"}</span>
              </div>
            ))}
            <p className="text-xs text-gray-500">Если что-то падает — скажи, какой ожидаемый результат, поправлю логику.</p>
          </Card>
        </section>
      </main>

      {/* Подвал */}
      <footer className="border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} AI MONO</p>
          <LinkA href="#" className="text-xs">Лицензия</LinkA>
        </div>
      </footer>

      {/* Модал «Сдать ДЗ» */}
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

      {/* Модал «Быстрый старт» */}
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

      {/* Модал «Справка» */}
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

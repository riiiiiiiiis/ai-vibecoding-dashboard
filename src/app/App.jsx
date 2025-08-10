import React, { useMemo, useState } from "react";
import { H2, H3, SectionHeading } from "../components/ui/Typography.jsx";
import { DividerDashed, DividerSolid, Card, LinkA } from "../components/ui/Primitives.jsx";
import { Button, Input, TextArea } from "../components/ui/Forms.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { GuideItem } from "../features/guides/GuideItem.jsx";
import { AssignmentItem } from "../features/assignments/AssignmentItem.jsx";
import { isHttpUrl, isLikelyEmail } from "../utils/validators.js";

const MODULES = [
  { key: "basics", name: "ИИ — основы" },
  { key: "prompts", name: "Консоль промптов" },
  { key: "knowledge", name: "База знаний" },
];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [moduleKey, setModuleKey] = useState("basics");
  const currentModule = useMemo(() => MODULES.find((m) => m.key === moduleKey), [moduleKey]);

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
    if (moduleKey === "basics") {
      return [
        {
          name: "Компонент AssignmentItem",
          pass: typeof AssignmentItem === "function",
          qa: [
            { q: "Что делает AssignmentItem?", a: "Отображает карточку задания: описание, дедлайн, статус и кнопку 'Сдать'." },
            { q: "Как отправить задание?", a: "Нажмите 'Сдать' — вызывается onSubmit(title), открывается модал отправки." },
          ],
        },
        {
          name: "Валидатор URL",
          pass: isHttpUrl("https://x") && !isHttpUrl("ftp://x"),
          qa: [
            { q: "Какие URL валидны?", a: "Только http/https (начинаются с http:// или https://)." },
            { q: "Пример", a: "https://x — валиден; ftp://x — не валиден." },
          ],
        },
        {
          name: "Эвристика email",
          pass: isLikelyEmail("a@b.c") && !isLikelyEmail("bad"),
          qa: [
            { q: "Что проверяется?", a: "Наличие символов '@' и '.' — это упрощённая эвристика, не строгая валидация." },
            { q: "Пример", a: "a@b.c — валиден; bad — не валиден." },
          ],
        },
      ];
    }
    if (moduleKey === "prompts") {
      return [
        {
          name: "Базовые понятия: промпты",
          pass: true,
          qa: [
            { q: "Что такое промпт?", a: "Текстовая инструкция для модели: цель, контекст, формат ответа, ограничения." },
            { q: "Системный vs пользовательский промпт", a: "Системный задаёт правила/роль; пользовательский — конкретный запрос." },
            { q: "Что улучшает промпт?", a: "Ясность задачи, требования к формату, few‑shot примеры, критерии проверки." },
          ],
        },
        {
          name: "Шаблоны промптов",
          pass: true,
          qa: [
            { q: "Структура", a: "Роль → Контекст → Задача → Формат ответа → Ограничения → Критерии." },
            { q: "Пример", a: "'Ты редактор. Выровняй стиль текста, верни Markdown, без лишних комментариев.'" },
          ],
        },
        {
          name: "A/B тестирование подсказок",
          pass: true,
          qa: [
            { q: "Как сравнивать?", a: "Фиксируйте входные данные и критерии; меняйте один параметр за раз." },
            { q: "Метрики", a: "Согласованность формата, полнота ответа, субъективное качество, длина, время." },
          ],
        },
      ];
    }
    // knowledge
    return [
      {
        name: "Импорт источников",
        pass: true,
        qa: [
          { q: "Что поддерживается?", a: "PDF, Markdown, текстовые фрагменты. Индексация по разделам." },
          { q: "Как цитировать?", a: "Храните ссылку на оригинал и якорь страницы/позиции." },
        ],
      },
      {
        name: "Поиск и фильтры",
        pass: true,
        qa: [
          { q: "Поиск по источникам", a: "Ограничивайте контекст релевантными документами и секциями." },
          { q: "Качество ответа", a: "Показывайте цитаты и источники, избегайте галлюцинаций." },
        ],
      },
      {
        name: "Проверка ссылок",
        pass: isHttpUrl("https://x") && !isHttpUrl("ftp://x"),
        qa: [
          { q: "Требования к ссылкам", a: "Только http/https; проверяйте доступность и формат." },
          { q: "Пример", a: "https://example.com — ок; ftp://example.com — нет." },
        ],
      },
    ];
  }, [moduleKey]);
  const allPass = tests.every((t) => t.pass);

  const guideItems = useMemo(() => {
    if (moduleKey === "basics") {
      return [
        { title: "Дневной отчёт из 300 сообщений", desc: "Как собирать данные из Telegram/Discord, резюмировать и отправлять дайджест в канал.", time: "7 мин" },
        { title: "Консоль промптов: быстрые тесты", desc: "Структуры промптов, фиксация контекста, быстрые A/B проверки ответов.", time: "5 мин" },
        { title: "База знаний без боли", desc: "Загрузка PDF/Markdown, извлечение цитат, ссылки на источники, экспорт результатов.", time: "9 мин" },
      ];
    }
    if (moduleKey === "prompts") {
      return [
        { title: "Шаблоны промптов", desc: "Роль → Контекст → Задача → Формат → Ограничения → Критерии.", time: "6 мин" },
        { title: "A/B тесты подсказок", desc: "Сравнение вариантов при фиксированном вводе и метриках.", time: "4 мин" },
        { title: "Few‑shot примеры", desc: "Как подбирать и сокращать примеры для лучшего качества.", time: "5 мин" },
      ];
    }
    return [
      { title: "Импорт PDF/MD", desc: "Стратегии парсинга, нормализация и сегментация.", time: "6 мин" },
      { title: "Поиск по источникам", desc: "Ограничение контекста релевантными документами.", time: "5 мин" },
      { title: "Цитирование", desc: "Ссылки, страницы, якоря; экспорт результатов.", time: "5 мин" },
    ];
  }, [moduleKey]);

  const assignmentItems = useMemo(() => {
    if (moduleKey === "basics") {
      return [
        { title: "ДЗ #1 — Мини-консоль промптов", desc: "Страница с полем ввода и кнопкой 'Run'. Добавьте 3 пресета.", due: "2025‑08‑17", status: "Открыто" },
        { title: "ДЗ #2 — Дневной отчёт", desc: "Сводка из 300 сообщений: парсинг → очистка → резюме → Markdown.", due: "2025‑08‑24", status: "Открыто" },
        { title: "ДЗ #3 — База знаний", desc: "Импорт PDF+MD, поиск по источникам, цитаты со ссылками.", due: "2025‑08‑31", status: "Скоро" },
      ];
    }
    if (moduleKey === "prompts") {
      return [
        { title: "ДЗ #1 — Шаблон промпта", desc: "Соберите шаблон с ролью, форматом ответа и критериями.", due: "2025‑08‑18", status: "Открыто" },
        { title: "ДЗ #2 — A/B тест", desc: "Сравните 2 версии подсказки на одном датасете.", due: "2025‑08‑25", status: "Открыто" },
      ];
    }
    return [
      { title: "ДЗ #1 — Импорт источников", desc: "Загрузите 2 PDF и 1 MD, выделите 5 цитат.", due: "2025‑08‑19", status: "Открыто" },
      { title: "ДЗ #2 — Поиск", desc: "Настройте поиск по источникам и покажите 3 ответа с цитатами.", due: "2025‑08‑26", status: "Открыто" },
    ];
  }, [moduleKey]);

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
        {/* Заголовок */}
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

        {/* Текущий модуль и переключение */}
        <Card className="py-3">
          <div className="flex flex-col gap-2">
            <div className="text-sm">
              <span className="text-gray-500">Текущий модуль: </span>
              <span className="font-bold text-black">{currentModule?.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MODULES.map((m) => (
                <Button
                  key={m.key}
                  variant={m.key === moduleKey ? "primary" : "secondary"}
                  onClick={() => setModuleKey(m.key)}
                  aria-pressed={m.key === moduleKey}
                >
                  {m.name}
                </Button>
              ))}
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
            {guideItems.map((g, idx) => (
              <React.Fragment key={g.title}>
                {idx > 0 && <DividerSolid />}
                <GuideItem title={g.title} desc={g.desc} time={g.time} />
              </React.Fragment>
            ))}
          </Card>
        </section>

        <section id="assignments" className="space-y-3">
          <SectionHeading>Домашние задания</SectionHeading>
          <Card className="space-y-6">
            {assignmentItems.map((a, idx) => (
              <React.Fragment key={a.title}>
                {idx > 0 && <DividerSolid />}
                <AssignmentItem title={a.title} desc={a.desc} due={a.due} status={a.status} onSubmit={openSubmit} />
              </React.Fragment>
            ))}
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
              <details key={i} className="group rounded-md border border-gray-200 bg-white p-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm">
                  <span className="text-gray-800">{t.name}</span>
                  <span className={`text-xs ${t.pass ? "text-gray-900" : "text-red-600"}`}>{t.pass ? "OK" : "FAIL"}</span>
                </summary>
                <div className="mt-2 pl-1 text-sm text-gray-800 space-y-2">
                  {Array.isArray(t.qa) && t.qa.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {t.qa.map((item, idx) => (
                        <li key={idx}>
                          <span className="font-bold">Вопрос:</span> {item.q}<br />
                          <span className="font-bold">Ответ:</span> {item.a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
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



import React, { useMemo, useState } from "react";
import { H2, H3, SectionHeading } from "../components/ui/Typography.jsx";
import { DividerDashed, DividerSolid, Card, LinkA } from "../components/ui/Primitives.jsx";
import { Button, Input, TextArea } from "../components/ui/Forms.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { GuideItem } from "../features/guides/GuideItem.jsx";
import { AssignmentItem } from "../features/assignments/AssignmentItem.jsx";
import { TermItem } from "../features/terms/TermItem.jsx";
import { LessonCard } from "../features/lessons/LessonCard.jsx";
import { isHttpUrl, isLikelyEmail } from "../utils/validators.js";
import { MODULES, getGuidesByModule, getAssignmentsByModule, getTestsByModule, getToolsByModule, getModuleOpenDate, getLessonsByModule, getTermsByModule } from "../config/modules.js";

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

  const [lessonOpen, setLessonOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

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

  const tests = useMemo(() => getTestsByModule(moduleKey, { AssignmentItem, isHttpUrl, isLikelyEmail }), [moduleKey]);
  const allPass = tests.every((t) => t.pass);

  const guideItems = useMemo(() => getGuidesByModule(moduleKey), [moduleKey]);

  const assignmentItems = useMemo(() => getAssignmentsByModule(moduleKey), [moduleKey]);

  const lessons = useMemo(() => getLessonsByModule(moduleKey), [moduleKey]);
  const terms = useMemo(() => getTermsByModule(moduleKey), [moduleKey]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-mono">

      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-3">
          <span />
          <nav className="flex items-center gap-3 text-xs text-gray-600">
            <a className="hover:underline" href="#lessons">Уроки</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#tools">Инструменты</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#guides">Гайды</a>
            <span className="text-gray-400">/</span>
            <a className="hover:underline" href="#assignments">Домашние</a>
          </nav>
          <div className="flex items-center gap-2" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6">
        {/* Заголовок */}
        <Card className="animate-fade-in">
          <header className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
            <div>
              <H2 className="text-lg">Vibecoding: Создаём первое приложение с AI‑промптами (без кода)</H2>
              <p className="mt-2 text-xs text-gray-600">Это основа, использованная для генерации полного плана урока.</p>
            </div>
          </header>
          <div className="mb-6">
            <SectionHeading className="mb-2">Путь студента</SectionHeading>
            <div className="text-sm text-gray-800">
              <p className="whitespace-pre-wrap">До урока студент испытывает любопытство и, возможно, опасение перед программированием. Во время урока он шаг за шагом осваивает магию создания приложений через простые текстовые команды, чувствуя себя первооткрывателем. После урока студент будет вдохновлён, уверен в своих силах и готов экспериментировать с созданием собственных AI‑генерируемых проектов.</p>
            </div>
          </div>
          <div className="mb-6">
            <SectionHeading className="mb-2">Целевая аудитория</SectionHeading>
            <div className="text-sm text-gray-800">
              <p>Люди, которые никогда не программировали и не имеют опыта в разработке приложений, но хотят создавать свои проекты.</p>
            </div>
          </div>
          <div className="mb-6">
            <SectionHeading className="mb-2">Измеримые результаты обучения</SectionHeading>
            <div className="text-sm text-gray-800">
              <ul className="list-disc list-outside pl-5 space-y-1">
                <li>После урока студент сможет объяснить, что такое промпт и как он используется для создания приложений.</li>
                <li>Сформулировать эффективные промпты для генерации базовой структуры простого веб‑приложения.</li>
                <li>Использовать выбранный AI‑инструмент для создания скелета приложения без написания кода.</li>
                <li>Определить основные компоненты простого веб‑приложения (UI, логика, данные).</li>
                <li>Запустить и проверить работоспособность сгенерированного AI‑приложения.</li>
              </ul>
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

        <section id="lessons" className="space-y-3">
          <SectionHeading>Уроки</SectionHeading>
          {moduleKey !== "basics" ? (
            <Card className="text-sm text-gray-800">Модуль ещё не открыт. Дата открытия: {getModuleOpenDate(moduleKey)}.</Card>
          ) : (
            <div className="py-2">
              <div className="flex items-stretch gap-3 overflow-x-auto">
                {lessons.map((l) => (
                  <LessonCard key={l.title} title={l.title} time={l.time} onClick={() => { setActiveLesson(l); setLessonOpen(true); }} />
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="terms" className="space-y-3">
          <SectionHeading>Ключевые термины</SectionHeading>
          {moduleKey !== "basics" ? (
            <Card className="text-sm text-gray-800">Модуль ещё не открыт. Дата открытия: {getModuleOpenDate(moduleKey)}.</Card>
          ) : (
            <Card className="space-y-1">
              {terms.map((t) => (
                <TermItem key={t.title} title={t.title} desc={t.desc} />
              ))}
            </Card>
          )}
        </section>

        <section id="tools" className="space-y-3">
          <SectionHeading>Инструменты</SectionHeading>
          {moduleKey !== "basics" ? (
            <Card className="text-sm text-gray-800">
              Модуль ещё не открыт. Дата открытия: {getModuleOpenDate(moduleKey)}.
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getToolsByModule(moduleKey).map((t) => (
                <Card key={t.title} id="console-card">
                  <H3>{t.title}</H3>
                  <p className="mt-2 text-sm text-gray-800">{t.desc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <a href={t.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary">Открыть</Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <DividerDashed />

        <section id="guides" className="space-y-3">
          <SectionHeading>Гайды</SectionHeading>
          {moduleKey !== "basics" ? (
            <Card className="text-sm text-gray-800">Модуль ещё не открыт. Дата открытия: {getModuleOpenDate(moduleKey)}.</Card>
          ) : (
            <Card className="space-y-6">
              {guideItems.map((g, idx) => (
                <React.Fragment key={g.title}>
                  {idx > 0 && <DividerSolid />}
                  <GuideItem title={g.title} desc={g.desc} time={g.time} />
                </React.Fragment>
              ))}
            </Card>
          )}
        </section>

        <section id="assignments" className="space-y-3">
          <SectionHeading>Домашние задания</SectionHeading>
          {moduleKey !== "basics" ? (
            <Card className="text-sm text-gray-800">Модуль ещё не открыт. Дата открытия: {getModuleOpenDate(moduleKey)}.</Card>
          ) : (
            <Card className="space-y-6">
              {assignmentItems.map((a, idx) => (
                <React.Fragment key={a.title}>
                  {idx > 0 && <DividerSolid />}
                  <AssignmentItem title={a.title} desc={a.desc} due={a.due} status={a.status} onSubmit={openSubmit} />
                </React.Fragment>
              ))}
            </Card>
          )}
        </section>

        <section id="tests" className="space-y-3">
          <SectionHeading>Тесты</SectionHeading>
          {moduleKey !== "basics" ? (
            <Card className="text-sm text-gray-800">Модуль ещё не открыт. Дата открытия: {getModuleOpenDate(moduleKey)}.</Card>
          ) : (
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
          )}
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

      <Modal open={lessonOpen} onClose={() => { setLessonOpen(false); setActiveLesson(null); }} title={activeLesson?.title || "Урок"}>
        <div className="space-y-2 text-sm text-gray-800">
          <p>{activeLesson?.desc}</p>
          {activeLesson?.time && <div className="text-xs text-gray-500">Время: {activeLesson.time}</div>}
        </div>
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



'use client';

import { useMemo, useState } from 'react';

type Idea = {
  id: number;
  title: string;
  category: 'Entdecken' | 'Automatisieren' | 'Teilen' | 'Optimieren';
  effort: 'kurz' | 'mittel' | 'umfangreich';
  impact: '🪄 schnell' | '🚀 skalierbar' | '🧠 lernreich';
  description: string;
  steps: string[];
  tools: string[];
};

const ideas: Idea[] = [
  {
    id: 1,
    title: 'Interaktive Produktdemo bauen',
    category: 'Entdecken',
    effort: 'mittel',
    impact: '🪄 schnell',
    description:
      'Setze eine klickbare Demo oder ein Storyboard um, damit andere sofort verstehen, was möglich ist.',
    steps: [
      'Strukturiere die Idee: Wer ist die Zielgruppe? Welches Problem löst du?',
      'Erstelle Mockups oder Screenshots als Visualisierungen.',
      'Veröffentliche die Demo als Mini-Landing-Page und sammele Feedback.',
    ],
    tools: ['Next.js UI', 'Figma/Canva', 'Vercel Deploy'],
  },
  {
    id: 2,
    title: 'Workflow automatisieren',
    category: 'Automatisieren',
    effort: 'umfangreich',
    impact: '🚀 skalierbar',
    description:
      'Verbinde APIs, um Routineaufgaben zu automatisieren und Zeit zu gewinnen — vom Reporting bis zur Content-Produktion.',
    steps: [
      'Identifiziere repetitive Aufgaben mit hohem Nerv-Faktor.',
      'Entwirf einen Flow: Auslöser, Aktionen, Rückkanal.',
      'Implementiere einen MVP und überwache Kennzahlen für Verbesserungen.',
    ],
    tools: ['Supabase Functions', 'Zapier/Make', 'Cron Jobs'],
  },
  {
    id: 3,
    title: 'Community-Playground starten',
    category: 'Teilen',
    effort: 'mittel',
    impact: '🧠 lernreich',
    description:
      'Schaffe einen Ort, an dem andere ausprobieren, kommentieren und gemeinsam weiterbauen können.',
    steps: [
      'Definiere klare Onboarding-Steps für neue Mitglieder.',
      'Baue Beispiele & Vorlagen, damit Ideen schnell starten können.',
      'Verankere Feedback-Schleifen: regelmäßige Sessions oder Async-Updates.',
    ],
    tools: ['Supabase Auth', 'Next.js Server Actions', 'GitHub Templates'],
  },
  {
    id: 4,
    title: 'Prototypen validieren',
    category: 'Optimieren',
    effort: 'kurz',
    impact: '🪄 schnell',
    description:
      'Teste Hypothesen mit echten Nutzer:innen und iteriere datengetrieben weiter.',
    steps: [
      'Erarbeite messbare Erfolgskriterien (z. B. Conversion, Engagement).',
      'Setze ein schlankes Tracking & Feedback-Formular auf.',
      'Analysiere Ergebnisse, priorisiere Learnings und plane den nächsten Zyklus.',
    ],
    tools: ['Supabase Analytics', 'Hotjar', 'Notion Insights'],
  },
  {
    id: 5,
    title: 'Content Hub für Wissenstransfer',
    category: 'Teilen',
    effort: 'umfangreich',
    impact: '🧠 lernreich',
    description:
      'Bündle Tutorials, Best Practices und Templates, damit dein Team schneller durchstartet.',
    steps: [
      'Inventarisiere vorhandene Inhalte und identifiziere Lücken.',
      'Erstelle modulare Kapitel mit klaren Outcomes.',
      'Integriere Feedback- und Update-Mechanismen, um Inhalte aktuell zu halten.',
    ],
    tools: ['MDX Content', 'Supabase Storage', 'Next.js Static Export'],
  },
  {
    id: 6,
    title: 'Live-Dashboards für Entscheidungen',
    category: 'Optimieren',
    effort: 'mittel',
    impact: '🚀 skalierbar',
    description:
      'Aggregiere Datenquellen, visualisiere KPIs und liefere Actionables für dein Team.',
    steps: [
      'Mappe Datenquellen und definiere ein einheitliches Schema.',
      'Baue Visualisierungen mit sinnvollen Schwellenwerten & Alerts.',
      'Rolle das Dashboard mit kurzer Schulung aus und sammele Feedback.',
    ],
    tools: ['Supabase SQL', 'Metabase/Lightdash', 'Next.js API Routes'],
  },
];

const effortLabels: Record<Idea['effort'], string> = {
  kurz: '⏱️ 1–2 Sessions',
  mittel: '🛠️ 1–2 Wochen',
  umfangreich: '🏗️ Mehrere Sprints',
};

const focusAreas: {
  id: string;
  title: string;
  headline: string;
  description: string;
  hint: string;
}[] = [
  {
    id: 'impact',
    title: 'Schnelle Wirkung',
    headline: 'Ich brauche Resultate – am besten sofort.',
    description:
      'Starte mit kompakten Experimenten, die in wenigen Sessions live sind. Sammle Momentum, indem du Ergebnisse offen teilst.',
    hint: 'Filter nach Kategorie „Entdecken“ und Aufwand „kurz“ für sofortige Wins.',
  },
  {
    id: 'scale',
    title: 'Skalierbarkeit',
    headline: 'Ich will wiederkehrende Arbeit automatisieren.',
    description:
      'Fokussiere dich auf Automatisierungs- und Dashboard-Ideen. Achte auf ein robustes Monitoring, damit der Flow stabil bleibt.',
    hint: 'Nutze Ideen mit Impact „🚀 skalierbar“ und plane klare Ownership.',
  },
  {
    id: 'community',
    title: 'Community & Sharing',
    headline: 'Ich möchte andere einbinden und Wissen teilen.',
    description:
      'Setze auf Formate, bei denen Menschen aktiv mitmachen können. Gute Dokumentation und leichte Einstiegspunkte sind Schlüssel.',
    hint: 'Kategorie „Teilen“ kombiniert mit Tools für Kollaboration sind dein Sweet Spot.',
  },
];

const categories: Idea['category'][] = [
  'Entdecken',
  'Automatisieren',
  'Teilen',
  'Optimieren',
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<Idea['category'] | 'alle'>('alle');
  const [searchTerm, setSearchTerm] = useState('');
  const [focus, setFocus] = useState(focusAreas[0]);

  const visibleIdeas = useMemo(() => {
    const lowered = searchTerm.trim().toLowerCase();
    return ideas.filter((idea) => {
      const matchesCategory =
        selectedCategory === 'alle' || idea.category === selectedCategory;
      const matchesSearch =
        lowered.length === 0 ||
        idea.title.toLowerCase().includes(lowered) ||
        idea.description.toLowerCase().includes(lowered) ||
        idea.steps.some((step) => step.toLowerCase().includes(lowered));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">Was kann ich damit machen?</span>
          <h1>
            Entdecke, baue und teile <span>deine nächste Idee</span>
          </h1>
          <p>
            Die Ideenwerkstatt hilft dir, konkrete Use-Cases zu finden, die du
            sofort ausprobieren kannst – egal, ob du etwas präsentieren,
            automatisieren oder gemeinsam gestalten willst.
          </p>
          <div className="controls">
            <div className="control">
              <label htmlFor="search">Wonach suchst du?</label>
              <input
                id="search"
                placeholder="z. B. Automatisierung, Dashboard, Community…"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="control">
              <label>Kategorie</label>
              <div className="pills">
                <button
                  type="button"
                  className={selectedCategory === 'alle' ? 'pill active' : 'pill'}
                  onClick={() => setSelectedCategory('alle')}
                >
                  Alle
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory === category ? 'pill active' : 'pill'
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <aside className="focus">
          <header>
            <span>Fokus wählen</span>
            <strong>{focus.title}</strong>
          </header>
          <h2>{focus.headline}</h2>
          <p>{focus.description}</p>
          <p className="hint">{focus.hint}</p>
          <div className="focus-buttons">
            {focusAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                className={focus.id === area.id ? 'focus-button active' : 'focus-button'}
                onClick={() => setFocus(area)}
              >
                {area.title}
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="ideas">
        <header>
          <h3>Ideen, die dazu passen</h3>
          <span>{visibleIdeas.length} Vorschläge</span>
        </header>
        <div className="grid">
          {visibleIdeas.map((idea) => (
            <article key={idea.id} className="card">
              <div className="card-head">
                <span className="badge">{idea.category}</span>
                <span className="impact">{idea.impact}</span>
              </div>
              <h4>{idea.title}</h4>
              <p className="description">{idea.description}</p>
              <ul>
                {idea.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <footer>
                <span className="effort">{effortLabels[idea.effort]}</span>
                <div className="tools">
                  {idea.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </footer>
            </article>
          ))}
          {visibleIdeas.length === 0 && (
            <div className="empty-state">
              <h4>Keine Treffer – noch.</h4>
              <p>
                Passe deine Suche an oder setze den Filter zurück, um neue
                Inspiration zu entdecken.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('alle');
                  setSearchTerm('');
                }}
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="next-steps">
        <h3>Nächste Schritte</h3>
        <div className="steps">
          <div>
            <strong>1 · Entscheide dich für einen Fokus</strong>
            <p>Nutze die Fokus-Kacheln, um zu definieren, was dir gerade am wichtigsten ist.</p>
          </div>
          <div>
            <strong>2 · Wähle eine Idee</strong>
            <p>Filtere nach Kategorie, Aufwand oder Impact und picke die Idee, die dich am meisten reizt.</p>
          </div>
          <div>
            <strong>3 · Starte klein</strong>
            <p>Beginne mit einem Mini-Experiment, sammle Feedback und skaliere, sobald es funktioniert.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

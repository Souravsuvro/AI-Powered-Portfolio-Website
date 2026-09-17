import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Category = "All" | "Portfolio" | "Landing" | "Dashboard" | "Commerce" | "Blog" | "App";

type Template = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  price: number;
  desc: string;
  codeSnippet: string;
};

const templates: Template[] = [
  {
    id: "folio-editorial",
    title: "Editorial folio",
    category: "Portfolio",
    price: 0,
    desc: "Serif display, hairline rules, and a work index that reads like a journal.",
    codeSnippet: `export function Hero() {\n  return (\n    <section className="min-h-screen grid place-items-center px-6">\n      <div className="max-w-3xl text-center">\n        <p className="text-sm tracking-[0.2em] uppercase text-gray-400">Studio</p>\n        <h1 className="mt-4 text-6xl leading-[0.95]">Work that earns the scroll.</h1>\n      </div>\n    </section>\n  );\n}`,
  },
  {
    id: "saas-quiet",
    title: "Quiet SaaS landing",
    category: "Landing",
    price: 0,
    desc: "Proof-first landing: one claim, three metrics, one action.",
    codeSnippet: `export function ProofBar() {\n  const stats = [\n    { k: "12wk", v: "typical engagement" },\n    { k: "4", v: "products in market" },\n    { k: "UK", v: "timezone overlap" },\n  ];\n  return (\n    <div className="grid grid-cols-3 gap-6">\n      {stats.map((s) => (\n        <div key={s.k}><div className="text-3xl font-bold">{s.k}</div><div className="text-sm text-gray-400">{s.v}</div></div>\n      ))}\n    </div>\n  );\n}`,
  },
  {
    id: "ops-dashboard",
    title: "Ops dashboard",
    category: "Dashboard",
    price: 0,
    desc: "Dense but calm: KPI row, activity feed, and a status table.",
    codeSnippet: `export function KpiRow() {\n  return (\n    <div className="grid grid-cols-4 gap-4">\n      {["MRR", "Churn", "NPS", "Uptime"].map((k) => (\n        <div key={k} className="rounded-2xl border border-gray-800 p-4">\n          <div className="text-xs text-gray-400">{k}</div>\n          <div className="mt-2 text-2xl font-semibold">—</div>\n        </div>\n      ))}\n    </div>\n  );\n}`,
  },
  {
    id: "shop-minimal",
    title: "Minimal commerce",
    category: "Commerce",
    price: 0,
    desc: "Product grid with soft cards and a sticky cart summary.",
    codeSnippet: `export function ProductCard({ title, price }: { title: string; price: string }) {\n  return (\n    <article className="rounded-2xl border border-gray-800 overflow-hidden">\n      <div className="aspect-[4/5] bg-gray-900" />\n      <div className="p-4"><h3 className="font-medium">{title}</h3><p className="text-sm text-gray-400">{price}</p></div>\n    </article>\n  );\n}`,
  },
  {
    id: "blog-longform",
    title: "Longform blog",
    category: "Blog",
    price: 0,
    desc: "Reading-first layout with progress bar and related posts.",
    codeSnippet: `export function ArticleHeader({ title }: { title: string }) {\n  return (\n    <header className="mx-auto max-w-3xl px-6 py-16">\n      <p className="text-sm text-gray-400">Essay</p>\n      <h1 className="mt-3 text-5xl leading-tight">{title}</h1>\n    </header>\n  );\n}`,
  },
  {
    id: "app-shell",
    title: "App shell",
    category: "App",
    price: 0,
    desc: "Sidebar navigation, top bar, and a content canvas ready for product UI.",
    codeSnippet: `export function AppShell({ children }: { children: React.ReactNode }) {\n  return (\n    <div className="grid min-h-screen grid-cols-[240px_1fr]">\n      <aside className="border-r border-gray-800 p-4">Nav</aside>\n      <main className="p-6">{children}</main>\n    </div>\n  );\n}`,
  },
];

const CATEGORIES: Category[] = ["All", "Portfolio", "Landing", "Dashboard", "Commerce", "Blog", "App"];

const TemplateDesigns: React.FC = () => {
  const [category, setCategory] = useState<Category>("All");
  const [selected, setSelected] = useState<Template | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const catOk = category === "All" || t.category === category;
      const q = query.trim().toLowerCase();
      const qOk = !q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="mb-8 inline-flex text-indigo-400 hover:text-indigo-300">Home</Link>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">Template Designs</h1>
          <p className="text-xl text-gray-400">Production-ready UI shells you can adapt for clients and products.</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === c ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-300 hover:bg-gray-800"}`}>
                {c}
              </button>
            ))}
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates…"
            className="w-full sm:w-64 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm outline-none focus:border-indigo-500" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <button key={t.id} type="button" onClick={() => setSelected(t)}
              className="rounded-3xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">{t.category}</span>
                <span className="text-sm text-indigo-400">{t.price === 0 ? "Free" : `$${t.price}`}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">{t.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3">{t.desc}</p>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-gray-500">No templates match your filters.</p>
        )}

        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4" onClick={() => setSelected(null)}>
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gray-700 bg-gray-900 p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400">{selected.category}</p>
                  <h2 className="text-3xl font-bold">{selected.title}</h2>
                  <p className="mt-2 text-gray-400">{selected.desc}</p>
                </div>
                <button type="button" onClick={() => setSelected(null)} className="text-gray-400 hover:text-white">Close</button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-800">
                <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ margin: 0, padding: "1.25rem", fontSize: 13 }}>
                  {selected.codeSnippet}
                </SyntaxHighlighter>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:souravsuvra007@gmail.com?subject=Template%20request"
                  className="flex-1 rounded-2xl bg-indigo-600 py-4 text-center font-semibold">Contact Sourav</a>
                <button type="button" onClick={() => setSelected(null)}
                  className="flex-1 rounded-2xl border border-gray-700 py-4 font-semibold hover:bg-gray-800">Back to catalog</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateDesigns;

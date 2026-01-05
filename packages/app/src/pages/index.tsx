import { App, apps } from '@store/data/apps';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

const categories: string[] = [...new Set(apps.map(({ category }) => category))];

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';
};

const HomePage: NextPage = () => {
  const [{ query, category }, setState] = useState({
    query: '',
    category: 'all',
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const filteredApps: App[] = (apps as App[]).filter(
    ({ name = '', tags = [], category: appCategory }) => {
      const q = query.toLowerCase();
      const matchesQuery =
        name.toLowerCase().includes(q) ||
        tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesCategory = category === 'all' || appCategory === category;

      return matchesQuery && matchesCategory;
    }
  );

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Navbar */}
      <header className="bg-base-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-tight">
              App Store
            </span>
            <span className="text-xs opacity-60">
              Privacy-first in-browser utilities
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm tooltip"
              data-tip="Toggle theme">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            <Link
              href="https://hieudoanm.github.io"
              target="_blank"
              className="text-sm opacity-70 hover:opacity-100">
              Hieu Doan
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-base-100 mb-6 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              placeholder="Search apps, tags…"
              className="input input-bordered flex-1"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setState({ query: e.target.value, category })
              }
            />

            <select
              className="select select-bordered sm:w-56"
              value={category}
              onChange={(e) => setState({ query, category: e.target.value })}>
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {(query || category !== 'all') && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setState({ query: '', category: 'all' })}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredApps.map(({ id, href, github, name, category }) => (
            <div
              key={id}
              className="group card bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="card-body p-4">
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-content flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-bold">
                    {name.at(0)?.toUpperCase() ?? 'A'}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h2 className="leading-tight font-semibold">{name}</h2>

                    <span className="badge badge-primary badge-sm mt-1 w-fit">
                      {category}
                    </span>

                    <div className="mt-auto flex items-center gap-2 pt-4">
                      <Link
                        href={href}
                        target="_blank"
                        className="btn btn-sm btn-primary">
                        Open
                      </Link>

                      <Link
                        href={github}
                        target="_blank"
                        className="btn btn-sm btn-ghost opacity-70">
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredApps.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="text-4xl">🔍</div>
              <p className="mt-2 font-medium">No apps found</p>
              <p className="text-sm opacity-60">
                Try a different keyword or category
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

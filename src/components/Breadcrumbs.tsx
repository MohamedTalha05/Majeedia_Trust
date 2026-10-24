import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../lib/app-context';
import { getCrumbs } from '../seo/head';

export function Breadcrumbs() {
  const { match, content, t } = useApp();
  const crumbs = getCrumbs(match, content);
  if (crumbs.length < 2) return null;
  return (
    <nav aria-label={t.common.breadcrumb} className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className="hover:text-ink hover:underline underline-offset-4">
                    {crumb.name}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

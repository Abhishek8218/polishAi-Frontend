import { Construction, Sparkles } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon = ({
  title,
  description = 'We are working hard to bring this feature to life.',
}: ComingSoonProps) => {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
          <Construction className="h-10 w-10 text-white" />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-on-surface">
          <Sparkles className="h-4 w-4" />
          Coming Soon
        </div>

        <h1 className="mb-4 text-3xl font-semibold text-white">
          {title}
        </h1>

        <p className="text-on-surface-variant leading-relaxed">
          {description}
        </p>

        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
          </div>

          <p className="mt-3 text-sm text-on-surface-variant">
            Currently under development
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
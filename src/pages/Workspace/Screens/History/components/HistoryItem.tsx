// components/HistoryItem.tsx
import { format } from 'date-fns';
import { ArrowRight, Eye } from 'lucide-react';
import Button from '../../../../../shared/components/ui/Button';

interface HistoryItemProps {
  item: {
    id: string;
    originalText: string;
    polishedText: string;
    creditsUsed: number;
    createdAt: string;
    framework: {
      name: string;
    };
  };
}

export function HistoryItem({ item }: HistoryItemProps) {
  const date = new Date(item.createdAt);
  const timeStr = format(date, 'MMM dd, h:mm a').toUpperCase();
  
  const type = item.framework.name.toUpperCase();

  return (
    <div className="flex flex-row justify-between items-center rounded-2xl group  border border-[#2a2a2e] bg-[#161618] hover:border-[#3a3a4a] hover:bg-[#1a1a1e] transition-all duration-200 group p-6 mb-4">
      <div className="flex flex-col items-start gap-6">
        {/* Type Badge */}
        <div className="items-center flex gap-12">
          <div className="inline-block rounded-full bg-[#2a2a2e] px-4 py-1 text-xs font-medium text-white tracking-widest">
            {type}
          </div>
           <span className="text-xs text-on-surface-variant tracking-widest">{timeStr}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* <div className="flex items-center justify-between mb-3">
           
            <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
              <span>{item.creditsUsed} Credit{item.creditsUsed !== 1 ? 's' : ''}</span>
            </div>
          </div> */}

          <div className="space-x-4 flex items-center
          ">
            {/* Original */}
            <div>
              <div className="text-[13px] text-on-surface-variant mb-1.5">ORIGINAL</div>
              <div className="line-clamp-2 text-sm text-white leading-relaxed">
                {item.originalText.slice(0, 50) + (item.originalText.length > 100 ? '...' : '')}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center text-on-surface-variant">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Polished */}
            <div>
              <div className="text-[13px] text-on-surface-variant mb-1.5">POLISHED</div>
              <div className="line-clamp-2 text-sm text-white leading-relaxed ">
                {item.polishedText.slice(0, 50) + (item.polishedText.length > 100 ? '...' : '')}
              </div>
            </div>
          </div>
        </div>

      
      </div>
        {/* Actions */}
        <div className="flex flex-col items-end self-center gap-3 pt-1">
          {/* <Button 
           icon={ <Eye className="h-4 w-4" />}
           // className="flex items-center gap-2 rounded-xl text-white border border-[#2a2a2e] bg-[#161618] px-5 py-2.5 text-sm hover:border-[#3a3a4a] hover:bg-[#1a1a1e] transition-all group-hover:border-[#4a4a5a]"
          >
           
            View
          </Button> */}
        </div>
    </div>
  );
}
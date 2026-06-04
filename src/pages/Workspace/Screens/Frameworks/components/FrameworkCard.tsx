import React from 'react';
import { MoreVertical, ChevronRight, Delete, PencilIcon, ChevronsUp } from 'lucide-react';

import type { Framework } from '../type';
import PopoverDropdown, { type DropdownOption } from '../../../../../shared/components/ui/PopoverDropdown';

interface FrameworkCardProps {
  framework: Framework;
  onUse?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const menuOptions: DropdownOption[] = [
  {
    label: 'Edit',
    value: 'edit',
    icon: <PencilIcon size={18} />,
  },
  {
    label: 'Delete',
    value: 'delete',
    icon: <Delete size={18} />,
  },
  {
    label: 'Use Framework',
    value: 'use',
    icon: <ChevronsUp size={18} />,
  },
];

const FrameworkCard = ({
  framework,
  onUse,
  onEdit,
  onDelete,
}: FrameworkCardProps) => {
  const handleMenuAction = (value: string) => {
    switch (value) {
      case 'edit':
        onEdit?.(framework.id);
        break;
      case 'delete':
        onDelete?.(framework.id);
        break;
      case 'use':
        onUse?.(framework.id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border border-[#2a2a2e] bg-[#161618] hover:border-[#3a3a4a] hover:bg-[#1a1a1e] transition-all duration-200 group">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="font-base text-[16px] text-on-surface leading-tight">
            {framework.name}
          </h3>
          <span className="text-[12px] font-bold tracking-widest text-secondary-teal uppercase">
            {framework.tone}
          </span>
        </div>

        <PopoverDropdown
          options={menuOptions}
          onSelect={handleMenuAction}
          menuWidth="w-56"
          className="border-none bg-transparent hover:bg-transparent p-1"
          trigger={
            <button
              aria-label="Framework options"
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-150 opacity-0 group-hover:opacity-100 hover:cursor-pointer  "
            >
              <MoreVertical size={15} />
            </button>
          }
        />
      </div>

      {/* Description */}
      <p className="text-[12px] text-on-surface-variant leading-relaxed line-clamp-3">
        {framework.prompt}
      </p>

      {/* CTA */}
      {/* <button
        onClick={() => onUse?.(framework.id)}
        className="flex items-center gap-1 mt-0.5 w-fit text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors duration-150 group/cta hover:cursor-pointer"
      >
        Use this Framework
        <ChevronRight
          size={14}
          className="transition-transform duration-150 group-hover/cta:translate-x-0.5"
        />
      </button> */}
    </div>
  );
};

export default FrameworkCard;
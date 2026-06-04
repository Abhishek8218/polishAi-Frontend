// components/FrameworkForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, TrendingUp } from 'lucide-react';

import Input from '../../../../../shared/components/ui/Input';
import Textarea from '../../../../../shared/components/ui/TextArea';
import Toggle from '../../../../../shared/components/ui/Toggle';
import ChipGroup from '../../../../../shared/components/ui/Chip';
import SegmentedControl from '../../../../../shared/components/ui/SegmentedControl';
import RangeSlider from '../../../../../shared/components/ui/RangeSelector';
import Button from '../../../../../shared/components/ui/Button';

import {
  createFramework,
  updateFramework,
  getFrameworkById,
} from '../services/frameworks.services';

import { createFrameworkSchema, type CreateFrameworkInput, type UpdateFrameworkInput } from '../type';

const TONE_OPTIONS = [
  { label: 'Neutral', value: 'NEUTRAL' },
  { label: 'Professional', value: 'PROFESSIONAL' },
  { label: 'Casual', value: 'CASUAL' },
  { label: 'Friendly', value: 'FRIENDLY' },
  { label: 'Formal', value: 'FORMAL' },
  { label: 'Conversational', value: 'CONVERSATIONAL' },
  { label: 'Assertive', value: 'ASSERTIVE' },
  { label: 'Empathetic', value: 'EMPATHETIC' },
] as const;

const LENGTH_OPTIONS = [
  { label: 'Shorter', value: 'SHORTER' },
  { label: 'Original', value: 'ORIGINAL' },
  { label: 'Longer', value: 'LONGER' },
  { label: 'Concise', value: 'CONCISE' },
  { label: 'Add More', value: 'ADD_MORE' },
] as const;

const formalityLabel = (v: number) => (v < 33 ? 'Casual' : v < 66 ? 'Balanced' : 'Formal');
const creativityLabel = (v: number) => (v < 33 ? 'Focused' : v < 66 ? 'Balanced' : 'Creative');

interface FrameworkFormProps {
  frameworkId?: string;           // ← Pass ID for Edit mode
  defaultValues?: Partial<CreateFrameworkInput>;
  onSuccess?: (data: any) => void;
  onCancel: () => void;
}

const FrameworkForm = ({ frameworkId, defaultValues, onSuccess, onCancel }: FrameworkFormProps) => {
  const queryClient = useQueryClient();
  const isEditMode = !!frameworkId;

  // Fetch existing framework data in Edit mode
  const { data: existingFramework, isLoading: isLoadingFramework } = useQuery({
    queryKey: ['framework', frameworkId],
    queryFn: () => getFrameworkById(frameworkId!),
    enabled: isEditMode,
    staleTime: 5 * 60 * 1000,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFrameworkInput>({
    resolver: zodResolver(createFrameworkSchema),
    defaultValues: {
      name: '',
      prompt: '',
     
      tone: 'PROFESSIONAL',
      formalityLevel: 60,
      creativityLevel: 25,
      lengthPreference: 'ORIGINAL',
      preserveStyle: true,
      enhanceClarity: false,
      ...defaultValues,
    },
  });

  // Populate form when editing
  React.useEffect(() => {
    if (existingFramework?.data) {
      const fw = existingFramework.data;
      reset({
        name: fw.name,
        prompt: fw.prompt || fw.description || '',
   
        tone: fw.tone,
        formalityLevel: fw.formalityLevel,
        creativityLevel: fw.creativityLevel,
        lengthPreference: fw.lengthPreference,
        preserveStyle: fw.preserveStyle,
        enhanceClarity: fw.enhanceClarity,
      });
    }
  }, [existingFramework, reset]);

  const watchedValues = watch();
  const hasPreview = watchedValues.name?.trim() || watchedValues.prompt?.trim();

  // Mutation (Create or Update)
  const mutation = useMutation({
    mutationFn: (data: CreateFrameworkInput) => {
      if (isEditMode && frameworkId) {
        return updateFramework(frameworkId, data as UpdateFrameworkInput);
      }
      return createFramework(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['frameworks'] });
      onSuccess?.(data);
    },
  });

  const onSubmit = (data: CreateFrameworkInput) => {
    mutation.mutate(data);
  };

  if (isEditMode && isLoadingFramework) {
    return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-white absolute top-1/2 "/></div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-none">
        <Input
          label="Framework Name"
          placeholder="e.g. Sales Outreach Optimizer"
          error={errors.name?.message}
          {...register('name')}
        />

        <Textarea
          label="Prompt Instructions"
          placeholder="Describe how the AI should rewrite or process the text..."
          rows={5}
          error={errors.prompt?.message}
          {...register('prompt')}
        />


        <ChipGroup
          label="Tone"
          options={TONE_OPTIONS}
          value={watchedValues.tone}
          onChange={(value) => setValue('tone', value as any, { shouldValidate: true })}
          error={errors.tone?.message}
        />

        <RangeSlider
          label="Formality Level"
          value={watchedValues.formalityLevel}
          onChange={(v) => setValue('formalityLevel', v, { shouldValidate: true })}
          valueLabel={formalityLabel(watchedValues.formalityLevel)}
        />

        <RangeSlider
          label="Creativity Level"
          value={watchedValues.creativityLevel}
          onChange={(v) => setValue('creativityLevel', v, { shouldValidate: true })}
          valueLabel={creativityLabel(watchedValues.creativityLevel)}
        />

        <SegmentedControl
          label="Output Length"
          options={LENGTH_OPTIONS}
          value={watchedValues.lengthPreference}
          onChange={(v) => setValue('lengthPreference', v as any, { shouldValidate: true })}
        />

        <div className="space-y-4 pt-2">
          <Toggle
            label="Preserve Writing Style"
            checked={watchedValues.preserveStyle}
            onChange={() => setValue('preserveStyle', !watchedValues.preserveStyle)}
          />
          <Toggle
            label="Automatic Clarity Enhancement"
            checked={watchedValues.enhanceClarity}
            onChange={() => setValue('enhanceClarity', !watchedValues.enhanceClarity)}
          />
        </div>

        {/* Preview */}
        {hasPreview && (
          <div className="rounded-xl bg-surface-container-low border border-outline-variant p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-on-primary-container" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Framework Preview
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-surface-container-high rounded-full w-3/4" />
              <div className="h-2 bg-surface-container-high rounded-full w-1/2" />
              <div className="h-2 bg-surface-container-high rounded-full w-2/3" />
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="shrink-0 bg-[#161618] border-t border-[#2a2a2e] px-6 py-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
        >
          Cancel
        </button>

        <Button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          loading={isSubmitting || mutation.isPending}
        >
          {mutation.isPending
            ? 'Saving...'
            : isEditMode
            ? 'Update Framework'
            : 'Save Framework'}
        </Button>
      </div>
    </form>
  );
};

export default FrameworkForm;
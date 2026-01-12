import { RotateCcw, ArrowRight } from 'lucide-react';

interface ActionButtonsProps {
  isValid: boolean;
  onGenerate: () => void;
  onReset: () => void;
}

export function ActionButtons({ isValid, onGenerate, onReset }: ActionButtonsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
      <button
        onClick={onReset}
        className="btn-secondary flex items-center justify-center gap-2 text-sm"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Form
      </button>

      <button
        onClick={onGenerate}
        disabled={!isValid}
        className="btn-primary flex items-center justify-center gap-2 text-sm"
      >
        Generate Trip Plan
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

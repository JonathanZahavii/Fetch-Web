import { ReactElement, useState } from 'react';

interface useMultiStepForm {
  currentStepIndex: number;
  step: ReactElement;
  steps: ReactElement[];
  next: VoidFunction;
  back: VoidFunction;
  goTo: (stepNumber: number) => void;
}

export const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) return prev;
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goTo = (stepNumber: number) => {
    setCurrentStepIndex(stepNumber);
  };

  return {
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    goTo,
  };
};

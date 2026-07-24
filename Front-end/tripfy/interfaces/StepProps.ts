export interface StepProps {
    theme: 'light' | 'dark';
    currentStep: number;
    setCurrentStep: (step: number) => void;
}
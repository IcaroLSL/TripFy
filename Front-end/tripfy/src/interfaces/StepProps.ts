import { Roteiro } from "./Roteiro";

export interface StepProps {
    theme: 'light' | 'dark';
    setDisabledNext: (disabled: boolean) => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    roteiroData: Roteiro;
    setRoteiroData: (roteiro: Roteiro) => void;
}
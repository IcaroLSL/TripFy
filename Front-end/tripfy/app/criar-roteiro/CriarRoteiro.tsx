import { View, Text, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { ScreenContent } from '../../components/ScreenContent'
import StepViewer from '../../components/CriacaoRoteiro/StepViewer';
import { Button } from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import { Roteiro } from '@/interfaces/Roteiro';
import Step4 from './Steps/Step4';
import { useRoteiroStore } from '@/store/roteiroStore';
import Step5 from './Steps/Step5';

const CriarRoteiro = () => {
  const {setCurrentStep, currentStep, roteiroData, setRoteiroData} = useRoteiroStore()
  const theme = useColorScheme() || 'light';
  const [disabledNext, setDisabledNext] = useState(false);

  return (
    <ScreenContent>
      <StepViewer totalSteps={5} currentStep={currentStep} />

      {currentStep === 1 && (
        <Step1 theme={theme} setDisabledNext={setDisabledNext} roteiroData={roteiroData} setRoteiroData={setRoteiroData} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 2 && (
        <Step2 theme={theme} setDisabledNext={setDisabledNext} roteiroData={roteiroData} setRoteiroData={setRoteiroData} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 3 && (
        <Step3 theme={theme} setDisabledNext={setDisabledNext} roteiroData={roteiroData} setRoteiroData={setRoteiroData} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 4 && (
        <Step4 theme={theme} setDisabledNext={setDisabledNext} roteiroData={roteiroData} setRoteiroData={setRoteiroData} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 5 && (
        <Step5 theme={theme} setDisabledNext={setDisabledNext} roteiroData={roteiroData} setRoteiroData={setRoteiroData} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

    </ScreenContent>
  )
}

export default CriarRoteiro
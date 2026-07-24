import { View, Text, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { ScreenContent } from '../../components/ScreenContent'
import { AppDescription, AppText, AppTitle } from '../../components/ui/TextApp';
import StepViewer from '../../components/ui/StepViewer';
import { Button } from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import { TextField } from '../../components/ui/FormFields/TextField';
import { useForm } from 'react-hook-form';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DateField } from '../../components/ui/FormFields/DateField';
import WarningCard from '../../components/ui/WarningCard';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

const CriarRoteiro = () => {
  const theme = useColorScheme() || 'light';
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <ScreenContent>
      <StepViewer totalSteps={5} currentStep={currentStep} />

      {currentStep === 1 && (
        <Step1 theme={theme} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 2 && (
        <Step2 theme={theme} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      <Divider theme={theme} />
      <View className='flex flex-row justify-center gap-4'>
        {currentStep > 1 && (
          <Button variant='outline' className='w-[40%] flex self-start' theme={theme} onPress={() => { setCurrentStep(currentStep - 1); }} disabled={currentStep <= 1}>
            <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              Anterior
            </Text>
          </Button>
        )}

        <Button className='w-[40%] flex self-end' theme={theme} onPress={() => { setCurrentStep(currentStep + 1); }} disabled={currentStep >= 5}>
          <Text className={`text-base text-center items-center ${theme === 'light' ? 'text-white' : 'text-white'}`}>
            Próximo
          </Text>
        </Button>
      </View>

    </ScreenContent>
  )
}

export default CriarRoteiro
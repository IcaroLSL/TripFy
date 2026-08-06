import { StatusBar } from 'expo-status-bar';

import '../global.css'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContent } from '../components/ScreenContent';
import { Image, Text, useColorScheme, View, ImageBackground } from 'react-native';
import Card from '../components/ui/Card';

import { AppDescription, AppText, AppTitle } from '../components/ui/TextApp';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '../components/ui/FormFields/TextField';
import { PasswordField } from '../components/ui/FormFields/PasswordField';
import { Button } from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import { SwitchField } from '../components/ui/FormFields/SwitchField';
import { usePostLogin } from '../hooks/usePostLogin';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function App() {
  const theme: 'light' | 'dark' = useColorScheme() || 'light';
  const { signInLogin, oAuthLogin, loading, error } = usePostLogin()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    }
  })

  const handleSignIn = async (data: FormData) => {
    const success = await signInLogin(data);
    if (success) {
      router.push('/home/home');
    }
  }

  const handleOAuthLogin = async (provider: 'GOOGLE' | 'APPLE') => {
    const success = await oAuthLogin(provider);
    if (success) {
      router.push('/home/home');
    }
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={theme === 'light' ? require('../assets/images/fundo_light_login.png') : require('../assets/images/fundo_dark_login.jpg')}
        className='flex-1'
      >
        <SafeAreaView className={`h-screen w-screen flex flex-col justify-end p-4`}>

          <Image source={theme === 'light' ? require('../assets/images/logo_light_2.png') : require('../assets/images/logo_dark_2.png')} className='w-[50%] h-[30%] self-center' />

          <Card theme={theme} className='flex items-center h-[70%] gap-4'>

            <AppDescription theme={theme}>
              Don't have an account? <Text className='text-blue-500' onPress={() => console.log('Sign up')}>Sign up</Text>
            </AppDescription>
            <View className='items-start gap-2'>
              <AppText className='text-center' theme={theme}>
                Username:
              </AppText>
              <TextField control={control} name='username' placeholder='Enter your username' theme={theme} />
            </View>

            <View className='items-start gap-2'>
              <AppText className='text-center' theme={theme}>
                Password:
              </AppText>
              <PasswordField control={control} name='password' placeholder='Enter your password' theme={theme} />
            </View>

            <View className='flex flex-row justify-between items-center w-full'>
              <View>

                <SwitchField control={control} name='rememberMe' placeholder='Remember me' theme={theme} />

              </View>
              <Text className='text-blue-500' onPress={() => console.log('Forgot password')}>Forgot Password</Text>
            </View>

            <Button disabled={loading} className='w-[40%]' onPress={handleSubmit(handleSignIn)} theme={theme}>
              <AppText className='text-white' theme={theme}>
                {loading ? 'Signing in...' : 'Sign in'}
              </AppText>
            </Button>

            <Button disabled={loading} className='w-[40%]' onPress={() => router.push('/home/home')} theme={theme}>
              <AppText className='text-white' theme={theme}>
                to home
              </AppText>
            </Button>

            {error && <Text className='text-red-500'>{error}</Text>}

            <Divider theme={theme} message='Or continue' />

            <View className='flex flex-row gap-4 justify-center'>

              <Button disabled={loading} variant='outline' className='w-[40%]' onPress={() => handleOAuthLogin('GOOGLE')} theme={theme}>
                <AntDesign name='google' size={24} color={theme === 'dark' ? '#ffffff' : 'black'} />
              </Button>

              <Button disabled={loading} variant='outline' className='w-[40%]' onPress={() => handleOAuthLogin('APPLE')} theme={theme}>
                <AntDesign name='apple' size={24} color={theme === 'dark' ? '#ffffff' : 'black'} />
              </Button>
            </View>

          </Card>

        </SafeAreaView>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaProvider >
  );
}

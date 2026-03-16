import { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create Account — JesStore',
  description: 'Start your 14-day free trial on JesStore',
}

export default function RegisterPage() {
  return <RegisterForm />
}

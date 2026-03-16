import { Metadata } from 'next'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Reset Password — JesStore',
  description: 'Recover your JesStore account password',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}

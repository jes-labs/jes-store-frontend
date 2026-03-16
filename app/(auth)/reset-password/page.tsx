import { Metadata } from 'next'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Set New Password — JesStore',
  description: 'Set a new password for your JesStore account',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}

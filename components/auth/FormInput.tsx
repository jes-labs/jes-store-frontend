'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  type?: string
  placeholder?: string
  helperText?: string
}

export default function FormInput({
  name,
  label,
  type = 'text',
  placeholder,
  helperText,
  className,
  ...props
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
  const error = errors[name]

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <Label 
          htmlFor={name}
          className="font-['Plus_Jakarta_Sans'] text-sm font-medium text-gray-300"
        >
          {label}
        </Label>
        {helperText && (
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative group">
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={cn(
            "bg-[#121212] border-white/10 rounded-xl px-4 py-6 text-white text-sm transition-all duration-200",
            "placeholder:text-gray-600 focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            isPassword && "pr-12"
          )}
          {...register(name)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-destructive font-medium mt-1.5 pl-1"
          >
            {error.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, type LucideIcon } from "lucide-react";
import type { UseFormRegister, FieldValues, RegisterOptions, FieldError } from "react-hook-form";

type InputType = "email" | "password" | "text" | "confirmPassword";

interface FormInputProps<T extends FieldValues = FieldValues> {
  type: InputType;
  label: string;
  name: keyof T | string;
  register: UseFormRegister<T>;
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions<T>;
  className?: string;
  error?: FieldError | undefined;        // ← New: Accept error
}

const iconMap: Record<InputType, LucideIcon> = {
  email: Mail,
  password: Lock,
  confirmPassword: Lock,
  text: User,
};

export default function AuthFormInput<T extends FieldValues>({
  type,
  label,
  name,
  register,
  placeholder,
  required = true,
  rules,
  className = "",
  error,                     // ← New prop
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password" || type === "confirmPassword";
  const inputType = isPasswordField
    ? showPassword ? "text" : "password"
    : type;

  const Icon = iconMap[type];

  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
        {label}
      </label>

      <div className="relative">
        {/* Left Icon */}
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          className={`w-full h-14 rounded-2xl bg-[#0d0a25] border 
                     pl-12 pr-12 text-sm text-white placeholder:text-white/20 
                     outline-none transition-all
                     ${error 
                       ? 'border-red-500 focus:border-red-500' 
                       : 'border-white/[0.04] focus:border-[#14b8a6]/40'}`}
          {...register(name as any, {
            required: required && `${label} is required`,
            ...rules,
          })}
        />

        {/* Password Toggle */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Error Message - Displayed below the field */}
      {error && (
        <p className="mt-2 text-red-400 text-sm pl-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
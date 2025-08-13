"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-slate-900">DeFi Will</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-600">Secure your digital legacy today</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Sign Up</CardTitle>
              <CardDescription className="text-center">Step 1 of 2: Basic Information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1 rounded border-slate-300" />
                  <span className="text-sm text-slate-600">
                    I agree to the{" "}
                    <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1 rounded border-slate-300" />
                  <span className="text-sm text-slate-600">
                    I understand that DeFi Will uses advanced security measures to protect my digital assets
                  </span>
                </div>
              </div>

              <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep(2)}>
                Continue to Security Setup
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-slate-900">DeFi Will</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Security Setup</h1>
          <p className="text-slate-600">Configure your account security</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Step 2 of 2</CardTitle>
            <CardDescription className="text-center">Set up multi-factor authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">SMS Authentication</h3>
                    <p className="text-sm text-slate-600">Receive codes via text message</p>
                  </div>
                </div>
                <input type="radio" name="mfa" className="text-emerald-600" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Authenticator App</h3>
                    <p className="text-sm text-slate-600">Use Google Authenticator or similar</p>
                  </div>
                </div>
                <input type="radio" name="mfa" className="text-emerald-600" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-12" />
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div className="text-sm text-emerald-800">
                  <p className="font-medium">Enhanced Security Enabled</p>
                  <p>Your account will be protected with military-grade encryption and multi-signature technology.</p>
                </div>
              </div>
            </div>

            <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">Complete Account Setup</Button>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>Your security is our priority</p>
          <div className="flex items-center justify-center space-x-4">
            <span>🔒 End-to-end encryption</span>
            <span>🛡️ Hardware security modules</span>
          </div>
        </div>
      </div>
    </div>
  )
}

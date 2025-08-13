"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle, Heart, Shield, Calendar, Users, Settings } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"

interface DeadmanSwitchNotificationProps {
  className?: string
}

export function DeadmanSwitchNotification({ className = "" }: DeadmanSwitchNotificationProps) {
  const { address, isConnected } = useWeb3()
  const [lastConfirmation, setLastConfirmation] = useState<Date>(new Date())
  const [daysRemaining, setDaysRemaining] = useState(30)
  const [isConfirming, setIsConfirming] = useState(false)
  const [nextOfKinNotified, setNextOfKinNotified] = useState(false)

  // Simulate countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeDiff = now.getTime() - lastConfirmation.getTime()
      const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24))
      const remaining = Math.max(0, 30 - daysPassed)
      setDaysRemaining(remaining)

      // Trigger next of kin notification when 7 days remaining
      if (remaining <= 7 && !nextOfKinNotified) {
        setNextOfKinNotified(true)
      }
    }, 1000 * 60) // Update every minute

    return () => clearInterval(interval)
  }, [lastConfirmation, nextOfKinNotified])

  const confirmAlive = async () => {
    setIsConfirming(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLastConfirmation(new Date())
    setDaysRemaining(30)
    setNextOfKinNotified(false)
    setIsConfirming(false)
  }

  const getStatusColor = () => {
    if (daysRemaining > 14) return "bg-emerald-500"
    if (daysRemaining > 7) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusText = () => {
    if (daysRemaining > 14) return "Active"
    if (daysRemaining > 7) return "Warning"
    return "Critical"
  }

  if (!isConnected) return null

  return (
    <Card className={`border-l-4 border-l-emerald-500 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5 text-emerald-600" />
            Deadman Switch Status
          </CardTitle>
          <Badge variant="secondary" className={`${getStatusColor()} text-white`}>
            {getStatusText()}
          </Badge>
        </div>
        <CardDescription>Confirm you're alive to prevent automatic inheritance transfer</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Clock className="h-5 w-5 text-slate-600" />
            <div>
              <p className="text-sm font-medium">{daysRemaining} Days</p>
              <p className="text-xs text-slate-600">Until Transfer</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Calendar className="h-5 w-5 text-slate-600" />
            <div>
              <p className="text-sm font-medium">{lastConfirmation.toLocaleDateString()}</p>
              <p className="text-xs text-slate-600">Last Confirmation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Users className="h-5 w-5 text-slate-600" />
            <div>
              <p className="text-sm font-medium">3 Beneficiaries</p>
              <p className="text-xs text-slate-600">Will Receive Assets</p>
            </div>
          </div>
        </div>

        {/* Warnings and Notifications */}
        {daysRemaining <= 7 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Critical:</strong> Only {daysRemaining} days remaining!
              {nextOfKinNotified && " Your beneficiaries have been notified."}
            </AlertDescription>
          </Alert>
        )}

        {daysRemaining <= 14 && daysRemaining > 7 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Warning:</strong> {daysRemaining} days remaining until automatic transfer. Please confirm you're
              alive to reset the timer.
            </AlertDescription>
          </Alert>
        )}

        {nextOfKinNotified && (
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Your beneficiaries have been notified about the pending inheritance transfer. They can see the countdown
              but cannot access assets until the deadline.
            </AlertDescription>
          </Alert>
        )}

        {/* Confirmation Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={confirmAlive} disabled={isConfirming} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            {isConfirming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Confirming on Blockchain...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                I'm Alive - Reset Timer
              </>
            )}
          </Button>

          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Configure Settings
          </Button>
        </div>

        {/* How it Works */}
        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
          <p className="font-medium mb-1">How the Deadman Switch Works:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>You must confirm you're alive every 30 days</li>
            <li>At 7 days remaining, beneficiaries are automatically notified</li>
            <li>If no confirmation is received, assets transfer to your beneficiaries</li>
            <li>All confirmations are recorded on the Avalanche blockchain</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, FileText, TrendingUp, Clock, AlertTriangle } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"

export function DashboardStats() {
  const { isConnected } = useWeb3()

  const stats = [
    {
      title: "Active Wills",
      value: "3",
      change: "+1 this month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Protected Assets",
      value: "$12,125",
      change: "+2.1% today",
      icon: Shield,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Beneficiaries",
      value: "7",
      change: "2 pending approval",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "AI Monitoring",
      value: "Active",
      change: "Last check: 2 min ago",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Next Check-in",
      value: "14 days",
      change: "Reminder set",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Security Score",
      value: "98%",
      change: "Excellent",
      icon: AlertTriangle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  if (!isConnected) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{stat.title}</p>
                  <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-600 truncate">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

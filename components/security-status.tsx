import { Shield, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SecurityStatus() {
  const securityMetrics = [
    {
      label: "Multi-sig Security",
      status: "Active",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "AI Monitoring",
      status: "Learning",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "Legal Compliance",
      status: "Verified",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Backup Systems",
      status: "Warning",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading flex items-center space-x-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span>Security Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Overall Security Score</span>
            <span className="font-medium text-emerald-600">87%</span>
          </div>
          <Progress value={87} className="h-2" />
        </div>

        <div className="space-y-3">
          {securityMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm text-slate-700">{metric.label}</span>
                </div>
                <span className={`text-xs font-medium ${metric.color}`}>{metric.status}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

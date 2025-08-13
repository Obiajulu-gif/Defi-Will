"use client"

import { Activity, AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/use-web3"

export function ActivityFeed() {
  const { isConnected } = useWeb3()

  // Mock blockchain events - in real app this would come from event logs
  const activities = [
    {
      id: 1,
      type: "blockchain",
      icon: CheckCircle,
      title: "Will created on-chain",
      description: "Smart contract deployed successfully",
      time: "2 hours ago",
      status: "success",
      txHash: "0xabc123...def456",
    },
    {
      id: 2,
      type: "ai",
      icon: Activity,
      title: "AI monitoring detected activity",
      description: "Normal DeFi interaction patterns observed",
      time: "4 hours ago",
      status: "info",
      txHash: null,
    },
    {
      id: 3,
      type: "alert",
      icon: AlertTriangle,
      title: "Inactivity threshold approaching",
      description: "No activity detected for 25 days (30-day threshold)",
      time: "1 day ago",
      status: "warning",
      txHash: null,
    },
    {
      id: 4,
      type: "blockchain",
      icon: Clock,
      title: "Beneficiary added",
      description: "New beneficiary registered on-chain",
      time: "3 days ago",
      status: "info",
      txHash: "0x789xyz...123abc",
    },
  ]

  const viewTransaction = (txHash: string) => {
    window.open(`https://snowtrace.io/tx/${txHash}`, "_blank")
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Connect your wallet to view activity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
              <div
                className={`p-2 rounded-full ${
                  activity.status === "success"
                    ? "bg-green-100"
                    : activity.status === "warning"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    activity.status === "success"
                      ? "text-green-600"
                      : activity.status === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{activity.title}</p>
                  {activity.txHash && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewTransaction(activity.txHash!)}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-slate-600">{activity.description}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-500">{activity.time}</p>
                  {activity.txHash && <p className="text-xs text-slate-400 font-mono">{activity.txHash}</p>}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

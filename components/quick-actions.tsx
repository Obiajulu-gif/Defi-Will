import { Plus, Users, Settings, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: "Create New Will",
      description: "Set up inheritance for new assets",
      href: "/create-will",
    },
    {
      icon: Users,
      label: "Manage Beneficiaries",
      description: "Add or update beneficiary details",
      href: "/beneficiaries",
    },
    {
      icon: Settings,
      label: "Security Settings",
      description: "Configure multi-sig and thresholds",
      href: "/settings",
    },
    {
      icon: FileText,
      label: "Legal Documents",
      description: "View and download legal forms",
      href: "/documents",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Button key={index} variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-emerald-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Icon className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-600">{action.description}</p>
                </div>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}

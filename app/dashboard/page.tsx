import { DashboardHeader } from "@/components/dashboard-header"
import { WillsOverview } from "@/components/wills-overview"
import { ActivityFeed } from "@/components/activity-feed"
import { QuickActions } from "@/components/quick-actions"
import { SecurityStatus } from "@/components/security-status"
import { AssetPortfolio } from "@/components/asset-portfolio"
import { NetworkGuard } from "@/components/network-guard"
import { DashboardStats } from "@/components/dashboard-stats"
import { DeadmanSwitchNotification } from "@/components/deadman-switch-notification"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NetworkGuard>
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6 space-y-6">
          <DashboardStats />

          <DeadmanSwitchNotification />

          <AssetPortfolio />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <WillsOverview />
              <ActivityFeed />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <SecurityStatus />
            </div>
          </div>
        </main>
      </NetworkGuard>
    </div>
  )
}

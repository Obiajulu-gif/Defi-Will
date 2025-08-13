import { CreateWillFlow } from "@/components/create-will-flow"
import { NetworkGuard } from "@/components/network-guard"

export default function CreateWillPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NetworkGuard>
        <CreateWillFlow />
      </NetworkGuard>
    </div>
  )
}

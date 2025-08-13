import { DashboardHeader } from "@/components/dashboard-header"
import { BeneficiaryManagement } from "@/components/beneficiary-management"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BeneficiariesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Beneficiary Management</h1>
          <p className="text-slate-600">Configure who will inherit your digital assets</p>
        </div>

        <BeneficiaryManagement />
      </main>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Mail, Phone, Shield, AlertTriangle } from "lucide-react"

export function BeneficiaryManagement() {
  const beneficiaries = [
    {
      name: "Sarah Johnson",
      relationship: "Spouse",
      email: "sarah@email.com",
      phone: "+1 (555) 123-4567",
      allocation: "45%",
      status: "verified",
      avatar: "/diverse-woman-portrait.png",
      assets: ["ETH", "BTC", "AVAX"],
    },
    {
      name: "Michael Johnson",
      relationship: "Son",
      email: "michael@email.com",
      phone: "+1 (555) 987-6543",
      allocation: "35%",
      status: "pending",
      avatar: "/thoughtful-man.png",
      assets: ["ETH", "USDC"],
    },
    {
      name: "Children's Trust Fund",
      relationship: "Trust",
      email: "trust@lawfirm.com",
      phone: "+1 (555) 456-7890",
      allocation: "20%",
      status: "verified",
      avatar: null,
      assets: ["BTC", "AVAX"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <span>Beneficiaries</span>
            </CardTitle>
            <CardDescription>Manage your inheritance recipients</CardDescription>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {beneficiaries.map((beneficiary, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                  {beneficiary.avatar ? (
                    <img
                      src={beneficiary.avatar || "/placeholder.svg"}
                      alt={beneficiary.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="h-6 w-6 text-slate-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-slate-900">{beneficiary.name}</h3>
                    <Badge
                      variant={beneficiary.status === "verified" ? "default" : "secondary"}
                      className={
                        beneficiary.status === "verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {beneficiary.status === "verified" ? (
                        <Shield className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {beneficiary.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{beneficiary.relationship}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Mail className="h-3 w-3" />
                      <span>{beneficiary.email}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Phone className="h-3 w-3" />
                      <span>{beneficiary.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">{beneficiary.allocation}</div>
                <div className="text-xs text-slate-600">of total assets</div>
                <div className="flex space-x-1 mt-2">
                  {beneficiary.assets.map((asset, assetIndex) => (
                    <Badge key={assetIndex} variant="outline" className="text-xs">
                      {asset}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Legal Compliance Active</p>
              <p>All beneficiaries are verified according to local inheritance laws and KYC requirements.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

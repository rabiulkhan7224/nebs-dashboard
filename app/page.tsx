
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  FileText, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
                  Nebs-IT
                </h1>
                <p className="text-xl text-rose-200 mt-4">HR Management System</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Manage Your Workforce with Confidence
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Streamline HR operations, track attendance, manage notices, and empower your team — all in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-6 text-lg rounded-full shadow-xl">
                <Link href="/login">
                  <Shield className="mr-3 h-5 w-5" />
                  Login to Dashboard
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-white/30 text-black hover:bg-white/10 px-10 py-6 text-lg rounded-full backdrop-blur">
                <Link href="/dashboard">
                  <ArrowRight className="mr-3 h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>

     
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed to simplify HR management and improve team communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Employee Management</h3>
              <p className="text-gray-600">Complete employee database with profiles, roles, and departments</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Notice Board</h3>
              <p className="text-gray-600">Publish company-wide, department, or individual notices instantly</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security with role-based access control</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast & Modern</h3>
              <p className="text-gray-600">Lightning-fast performance with real-time updates</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your HR Management?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join hundreds of companies already using Nebs-IT to manage their workforce efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-12 py-7 text-lg rounded-full">
              <Link href="/login">
                <Globe className="mr-3 h-5 w-5" />
                Get Started Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

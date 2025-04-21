
import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => (
  <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 flex items-center font-serif">
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center font-serif">Our Pricing Plans</h1>
      <div className="grid md:grid-cols-3 gap-10">
        <Card className="bg-white shadow-lg border-indigo-300 dark:bg-gray-900/80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-serif">Free</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-5 text-gray-600 dark:text-gray-300">Basic access to practice materials and community support.</p>
            <div className="text-2xl mb-5">FREE</div>
            <Button className="w-full bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 border border-indigo-300">Get Started</Button>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-2xl border-indigo-500 dark:bg-gray-900/90 border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-600 font-serif">Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-5 text-gray-600 dark:text-gray-300">Everything in Free plus advanced analytics, mock tests, and AI-powered feedback.</p>
            <div className="text-2xl mb-5">$19<span className="text-sm opacity-80">/mo</span></div>
            <Button className="w-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 border border-indigo-600">Upgrade</Button>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg border-indigo-300 dark:bg-gray-900/80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-serif">Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-5 text-gray-600 dark:text-gray-300">For institutions: volume discounts, admin panel, and priority support.</p>
            <div className="text-2xl mb-5">Custom</div>
            <Button className="w-full bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 border border-indigo-300">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);
export default Pricing;

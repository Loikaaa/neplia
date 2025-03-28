
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Clock, Shield, CheckCircle } from 'lucide-react';

interface PaymentSectionProps {
  planId: string;
  onBack: () => void;
}

const PaymentSection = ({ planId, onBack }: PaymentSectionProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get plan details based on planId
  const getPlanDetails = (id: string) => {
    const plans = {
      'monthly': {
        name: 'Monthly',
        price: '$14.99',
        period: 'per month',
        color: 'bg-indigo hover:bg-indigo/90'
      },
      'quarterly': {
        name: 'Quarterly',
        price: '$39.99',
        period: 'per 3 months',
        color: 'bg-teal hover:bg-teal/90'
      },
      'yearly': {
        name: 'Yearly',
        price: '$149.99',
        period: 'per year',
        color: 'bg-coral hover:bg-coral/90'
      }
    };
    
    return plans[id] || plans.monthly;
  };
  
  const plan = getPlanDetails(planId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `You have successfully upgraded to the ${plan.name} plan.`,
        duration: 5000,
      });
      navigate('/dashboard');
    }, 2000);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center" 
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plans
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Complete Your Purchase</CardTitle>
            <CardDescription>Upgrade to {plan.name} Plan</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" placeholder="John Smith" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input 
                    id="card-number" 
                    placeholder="1234 5678 9012 3456" 
                    required 
                    pattern="[0-9\s]{13,19}"
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required pattern="(0[1-9]|1[0-2])\/[0-9]{2}" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required pattern="[0-9]{3,4}" />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className={`w-full ${plan.color}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ${plan.price} ${plan.period}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{plan.name} Plan</span>
                  <span className="font-medium">{plan.price}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Billing Period</span>
                  <span>{plan.period}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{plan.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-indigo mt-0.5" />
              <div>
                <h4 className="font-medium">Cancel anytime</h4>
                <p className="text-sm text-muted-foreground">You can cancel your subscription at any time with no penalties.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-indigo mt-0.5" />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">All transactions are secured and encrypted.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-indigo mt-0.5" />
              <div>
                <h4 className="font-medium">Instant Access</h4>
                <p className="text-sm text-muted-foreground">Get immediate access to all premium features after payment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;

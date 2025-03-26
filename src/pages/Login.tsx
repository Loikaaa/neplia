
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, User } from 'lucide-react';

import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
    
    // This would typically check against a backend/database
    // For now, we'll simulate successful login and store email in localStorage
    localStorage.setItem('userEmail', data.email);
    
    if (data.rememberMe) {
      localStorage.setItem('rememberUser', 'true');
    }
    
    toast({
      title: "Success!",
      description: "You have successfully logged in.",
      duration: 3000,
    });
    
    // Navigate to home after successful login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Pre-fill email if returning user had "remember me" checked
  React.useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberUser');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (rememberedUser === 'true' && savedEmail) {
      form.setValue('email', savedEmail);
      form.setValue('rememberMe', true);
    }
  }, [form]);

  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto px-4 py-12 md:py-20">
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight text-indigo">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Log in with your email to continue your learning journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="relative h-44 w-full overflow-hidden rounded-lg mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo/80 to-teal/80 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                  <div className="text-center px-4">
                    <h3 className="text-xl font-bold mb-2">IELTS Excellence Awaits</h3>
                    <p className="text-sm opacity-90">Continue your preparation journey with personalized practice materials and expert guidance.</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coral rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo rounded-full opacity-50 blur-xl"></div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="your.email@example.com" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground">
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </div>
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              Remember me
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-medium text-indigo hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button type="submit" className="w-full gap-2 font-medium">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" type="button" className="w-full">
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Facebook
                </Button>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-indigo hover:underline">
                  Sign up now
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

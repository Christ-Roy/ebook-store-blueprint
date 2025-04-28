
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [authStatus, setAuthStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  
  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        // Simple query to test connection using our test_connection table
        const { data, error } = await supabase.from('test_connection').select('*').limit(1);
        
        if (error) {
          console.error("Connection error:", error);
          setConnectionStatus('error');
        } else {
          console.log("Connection successful:", data);
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error("Error testing connection:", err);
        setConnectionStatus('error');
      }
    };

    // Test auth connection
    const testAuth = async () => {
      try {
        // Check if auth is configured properly
        const { data, error } = await supabase.auth.getUser();
        
        if (error && error.message !== "JWT expired" && !error.message.includes("not authenticated")) {
          console.error("Auth error:", error);
          setAuthStatus('error');
        } else {
          console.log("Auth configured correctly:", data);
          setAuthStatus('connected');
        }
      } catch (err) {
        console.error("Error testing auth:", err);
        setAuthStatus('error');
      }
    };

    testConnection();
    testAuth();
  }, []);

  const signUpTest = async () => {
    try {
      // Generate a test email with timestamp to avoid conflicts
      const testEmail = `test_${Date.now()}@example.com`;
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
      });
      
      if (error) {
        toast.error(`Auth signup test failed: ${error.message}`);
        console.error("Auth signup error:", error);
      } else {
        toast.success("Auth signup test successful");
        console.log("Auth signup successful:", data);
      }
    } catch (err: any) {
      toast.error(`Auth signup test error: ${err.message}`);
      console.error("Error testing auth signup:", err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Configuration Test</CardTitle>
        <CardDescription>Testing if Supabase is properly connected</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Database Connection:</span>
            <span className={`font-semibold ${
              connectionStatus === 'connected' ? 'text-green-500' : 
              connectionStatus === 'error' ? 'text-red-500' : 
              'text-yellow-500'
            }`}>
              {connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'error' ? 'Error' : 
               'Checking...'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Authentication:</span>
            <span className={`font-semibold ${
              authStatus === 'connected' ? 'text-green-500' : 
              authStatus === 'error' ? 'text-red-500' : 
              'text-yellow-500'
            }`}>
              {authStatus === 'connected' ? 'Configured' : 
               authStatus === 'error' ? 'Error' : 
               'Checking...'}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={signUpTest} 
          className="w-full"
          disabled={connectionStatus !== 'connected' || authStatus !== 'connected'}
        >
          Test SignUp Function
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseTest;

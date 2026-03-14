import { Link, useNavigate } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Boxes className="h-4 w-4 text-primary-foreground" />
            </div>
            InvoTrack
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border shadow-card p-6 space-y-4">
          <div className="grid gap-1.5"><Label>Full Name</Label><Input placeholder="John Doe" required /></div>
          <div className="grid gap-1.5"><Label>Email</Label><Input type="email" placeholder="john@example.com" required /></div>
          <div className="grid gap-1.5"><Label>Password</Label><Input type="password" placeholder="••••••••" required /></div>
          <Button type="submit" className="w-full">Create Account</Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


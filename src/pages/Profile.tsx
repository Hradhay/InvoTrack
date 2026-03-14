import { useState, useRef } from "react";
import { User, Camera, Trash2, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const initialUser = {
  name: "Warehouse Manager",
  email: "admin@invotrack.com",
  role: "Inventory Manager",
  imageUrl: "",
};

const roles = [
  { value: "inventory-manager", label: "Inventory Manager" },
  { value: "warehouse-worker", label: "Warehouse Worker" },
  { value: "warehouse-manager", label: "Warehouse Manager" },
];

export default function Profile() {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setUser({ ...user, imageUrl: file.name });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setUser({ ...user, imageUrl: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!user.name.trim() || !user.email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteDialog(false);
    try {
      await supabase.auth.signOut();
      navigate("/", { replace: true });
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account.",
        variant: "destructive",
      });
    }
  };

  const initials = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="bg-card rounded-xl border shadow-card p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imagePreview || user.imageUrl} />
              <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
            {imagePreview && (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute bottom-0 left-0 rounded-full h-8 w-8 p-0"
                onClick={handleRemoveImage}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* Form Fields */}
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label>Full Name</Label>
            <Input 
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <Input 
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Role</Label>
            <Select value={user.role} onValueChange={(value) => setUser({ ...user, role: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inventory Manager">
                  <Users className="mr-2 h-4 w-4" />
                  Inventory Manager
                </SelectItem>
                <SelectItem value="Warehouse Worker">
                  <Users className="mr-2 h-4 w-4" />
                  Warehouse Worker
                </SelectItem>
                <SelectItem value="Warehouse Manager">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Warehouse Manager
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button 
            variant="outline" 
            className="w-fit hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and all data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Warehouse {
  name: string;
  shortCode: string;
  address: string;
}

interface Location {
  name: string;
  shortCode: string;
  warehouseShortCode: string;
}

export default function AppSettings() {
  const { toast } = useToast();

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [warehouseForm, setWarehouseForm] = useState({ name: "", shortCode: "", address: "" });
  const [locationForm, setLocationForm] = useState({ name: "", shortCode: "", warehouseShortCode: "" });

  const isWarehouseValid = warehouseForm.name.trim() && warehouseForm.shortCode.trim() && warehouseForm.address.trim();
  const isLocationValid = locationForm.name.trim() && locationForm.shortCode.trim() && locationForm.warehouseShortCode;

  const allShortCodes = [...warehouses.map(w => w.shortCode.toLowerCase()), ...locations.map(l => l.shortCode.toLowerCase())];

  const handleCreateWarehouse = () => {
    const shortCode = warehouseForm.shortCode.trim().toLowerCase();
    if (!isWarehouseValid) {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    if (allShortCodes.includes(shortCode)) {
      toast({ title: "Error", description: "Short code must be unique.", variant: "destructive" });
      return;
    }
    setWarehouses([...warehouses, { ...warehouseForm, shortCode }]);
    setWarehouseForm({ name: "", shortCode: "", address: "" });
    toast({ title: "Success", description: "Warehouse created!" });
  };

  const handleCreateLocation = () => {
    const shortCode = locationForm.shortCode.trim().toLowerCase();
    if (!isLocationValid) {
      toast({ title: "Error", description: "Please fill all fields and select warehouse.", variant: "destructive" });
      return;
    }
    if (allShortCodes.includes(shortCode)) {
      toast({ title: "Error", description: "Short code must be unique.", variant: "destructive" });
      return;
    }
    setLocations([...locations, { ...locationForm, shortCode }]);
    setLocationForm({ name: "", shortCode: "", warehouseShortCode: "" });
    toast({ title: "Success", description: "Location added!" });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your warehouses and locations</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Warehouse Card */}
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Management</CardTitle>
            <CardDescription>Create new warehouses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="warehouse-name">Name</Label>
                <Input
                  id="warehouse-name"
                  value={warehouseForm.name}
                  onChange={(e) => setWarehouseForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Main Warehouse"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse-code">Short Code</Label>
                <Input
                  id="warehouse-code"
                  value={warehouseForm.shortCode}
                  onChange={(e) => setWarehouseForm((prev) => ({ ...prev, shortCode: e.target.value }))}
                  placeholder="MW"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse-address">Address</Label>
                <Input
                  id="warehouse-address"
                  value={warehouseForm.address}
                  onChange={(e) => setWarehouseForm((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main St, City"
                />
              </div>
            </div>
            <Button onClick={handleCreateWarehouse} className="w-full" disabled={!isWarehouseValid}>
              Create Warehouse
            </Button>
            {warehouses.length > 0 && (
              <div className="text-xs text-muted-foreground mt-4">
                {warehouses.length} warehouse{warehouses.length !== 1 ? 's' : ''} created
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card>
          <CardHeader>
            <CardTitle>Location Management</CardTitle>
            <CardDescription>
              Add storage locations (racks, shelves, rooms) to warehouses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="location-name">Location Name</Label>
                <Input
                  id="location-name"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Rack A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-code">Short Code</Label>
                <Input
                  id="location-code"
                  value={locationForm.shortCode}
                  onChange={(e) => setLocationForm((prev) => ({ ...prev, shortCode: e.target.value }))}
                  placeholder="RA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse-select">Warehouse</Label>
                <Select value={locationForm.warehouseShortCode} onValueChange={(value) => setLocationForm((prev) => ({ ...prev, warehouseShortCode: value }))} >
                  <SelectTrigger id="warehouse-select">
                    <SelectValue placeholder="Select a warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.shortCode} value={warehouse.shortCode}>
                        {warehouse.name} ({warehouse.shortCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateLocation} className="w-full" disabled={!isLocationValid}>
              Add Location
            </Button>
            {locations.length > 0 && (
              <div className="text-xs text-muted-foreground mt-4">
                {locations.length} location{locations.length !== 1 ? 's' : ''} added
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

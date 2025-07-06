import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface AddressProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const AddressSection: React.FC<AddressProps> = ({ data, onUpdate }) => {
  const [addressData, setAddressData] = useState({
    presentAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Bangladesh',
      district: '',
      upazila: ''
    },
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Bangladesh',
      district: '',
      upazila: ''
    },
    sameAsPresent: false,
    ...data
  });

  const updateField = (section: 'presentAddress' | 'permanentAddress', field: string, value: string) => {
    const updated = {
      ...addressData,
      [section]: {
        ...addressData[section],
        [field]: value
      }
    };
    setAddressData(updated);
    onUpdate(updated);
  };

  const handleSameAsPresent = (checked: boolean) => {
    const updated = {
      ...addressData,
      sameAsPresent: checked,
      permanentAddress: checked ? { ...addressData.presentAddress } : addressData.permanentAddress
    };
    setAddressData(updated);
    onUpdate(updated);
  };

  const bangladeshiDistricts = [
    'Barisal', 'Chittagong', 'Dhaka', 'Khulna', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet',
    'Comilla', 'Feni', 'Brahmanbaria', 'Rangamati', 'Noakhali', 'Chandpur', 'Lakshmipur',
    'Cox\'s Bazar', 'Bandarban', 'Khagrachhari', 'Faridpur', 'Gopalganj', 'Madaripur', 'Manikganj',
    'Munshiganj', 'Narayanganj', 'Rajbari', 'Shariatpur', 'Tangail', 'Kishoreganj', 'Netrokona',
    'Sherpur', 'Jamalpur', 'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna',
    'Sirajganj', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh',
    'Thakurgaon', 'Habiganj', 'Maulvibazar', 'Sunamganj', 'Narsingdi', 'Gazipur', 'Jashore',
    'Jhenaidah', 'Magura', 'Narail', 'Satkhira', 'Bagerhat', 'Chuadanga', 'Kushtia', 'Meherpur'
  ];

  return (
    <div className="space-y-8">
      {/* Present Address */}
      <Card>
        <CardHeader>
          <CardTitle>Present Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="presentStreet">Street Address *</Label>
            <Textarea
              id="presentStreet"
              value={addressData.presentAddress.street}
              onChange={(e) => updateField('presentAddress', 'street', e.target.value)}
              placeholder="Enter street address"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                value={addressData.presentAddress.city}
                onChange={(e) => updateField('presentAddress', 'city', e.target.value)}
                placeholder="Enter city"
              />
            </div>
            
            <div className="space-y-2">
              <Label>District</Label>
              <Select 
                value={addressData.presentAddress.district} 
                onValueChange={(value) => updateField('presentAddress', 'district', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {bangladeshiDistricts.map((district) => (
                    <SelectItem key={district} value={district.toLowerCase()}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Upazila/Thana</Label>
              <Input
                value={addressData.presentAddress.upazila}
                onChange={(e) => updateField('presentAddress', 'upazila', e.target.value)}
                placeholder="Enter upazila/thana"
              />
            </div>
            
            <div className="space-y-2">
              <Label>State/Division</Label>
              <Select 
                value={addressData.presentAddress.state} 
                onValueChange={(value) => updateField('presentAddress', 'state', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="barisal">Barisal</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="khulna">Khulna</SelectItem>
                  <SelectItem value="mymensingh">Mymensingh</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  <SelectItem value="rangpur">Rangpur</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                value={addressData.presentAddress.postalCode}
                onChange={(e) => updateField('presentAddress', 'postalCode', e.target.value)}
                placeholder="Enter postal code"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Country *</Label>
              <Select 
                value={addressData.presentAddress.country} 
                onValueChange={(value) => updateField('presentAddress', 'country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                  <SelectItem value="Nepal">Nepal</SelectItem>
                  <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permanent Address */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Permanent Address</CardTitle>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsPresent"
              checked={addressData.sameAsPresent}
              onCheckedChange={handleSameAsPresent}
            />
            <Label htmlFor="sameAsPresent" className="text-sm font-normal">
              Same as present address
            </Label>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="permanentStreet">Street Address *</Label>
            <Textarea
              id="permanentStreet"
              value={addressData.permanentAddress.street}
              onChange={(e) => updateField('permanentAddress', 'street', e.target.value)}
              placeholder="Enter street address"
              rows={3}
              disabled={addressData.sameAsPresent}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                value={addressData.permanentAddress.city}
                onChange={(e) => updateField('permanentAddress', 'city', e.target.value)}
                placeholder="Enter city"
                disabled={addressData.sameAsPresent}
              />
            </div>
            
            <div className="space-y-2">
              <Label>District</Label>
              <Select 
                value={addressData.permanentAddress.district} 
                onValueChange={(value) => updateField('permanentAddress', 'district', value)}
                disabled={addressData.sameAsPresent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {bangladeshiDistricts.map((district) => (
                    <SelectItem key={district} value={district.toLowerCase()}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Upazila/Thana</Label>
              <Input
                value={addressData.permanentAddress.upazila}
                onChange={(e) => updateField('permanentAddress', 'upazila', e.target.value)}
                placeholder="Enter upazila/thana"
                disabled={addressData.sameAsPresent}
              />
            </div>
            
            <div className="space-y-2">
              <Label>State/Division</Label>
              <Select 
                value={addressData.permanentAddress.state} 
                onValueChange={(value) => updateField('permanentAddress', 'state', value)}
                disabled={addressData.sameAsPresent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="barisal">Barisal</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="khulna">Khulna</SelectItem>
                  <SelectItem value="mymensingh">Mymensingh</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  <SelectItem value="rangpur">Rangpur</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                value={addressData.permanentAddress.postalCode}
                onChange={(e) => updateField('permanentAddress', 'postalCode', e.target.value)}
                placeholder="Enter postal code"
                disabled={addressData.sameAsPresent}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Country *</Label>
              <Select 
                value={addressData.permanentAddress.country} 
                onValueChange={(value) => updateField('permanentAddress', 'country', value)}
                disabled={addressData.sameAsPresent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                  <SelectItem value="Nepal">Nepal</SelectItem>
                  <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Upload } from 'lucide-react';

interface BankDetailsProps {
  data?: any;
  onUpdate: (data: any) => void;
}

export const BankDetailsSection: React.FC<BankDetailsProps> = ({ data, onUpdate }) => {
  const [bankData, setBankData] = useState({
    primaryBank: {
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      branchName: '',
      routingNumber: '',
      accountType: '',
      swiftCode: ''
    },
    additionalBanks: [],
    taxInfo: {
      tinNumber: '',
      taxCircle: '',
      taxZone: '',
      acknowledgeSlip: null
    },
    ...data
  });

  const updatePrimaryBank = (field: string, value: string) => {
    const updated = {
      ...bankData,
      primaryBank: {
        ...bankData.primaryBank,
        [field]: value
      }
    };
    setBankData(updated);
    onUpdate(updated);
  };

  const updateTaxInfo = (field: string, value: string) => {
    const updated = {
      ...bankData,
      taxInfo: {
        ...bankData.taxInfo,
        [field]: value
      }
    };
    setBankData(updated);
    onUpdate(updated);
  };

  const addAdditionalBank = () => {
    const updated = {
      ...bankData,
      additionalBanks: [
        ...bankData.additionalBanks,
        {
          accountHolderName: '',
          accountNumber: '',
          bankName: '',
          branchName: '',
          routingNumber: '',
          accountType: ''
        }
      ]
    };
    setBankData(updated);
    onUpdate(updated);
  };

  const removeAdditionalBank = (index: number) => {
    const updated = {
      ...bankData,
      additionalBanks: bankData.additionalBanks.filter((_, i) => i !== index)
    };
    setBankData(updated);
    onUpdate(updated);
  };

  const updateAdditionalBank = (index: number, field: string, value: string) => {
    const updated = {
      ...bankData,
      additionalBanks: bankData.additionalBanks.map((bank, i) => 
        i === index ? { ...bank, [field]: value } : bank
      )
    };
    setBankData(updated);
    onUpdate(updated);
  };

  const bangladeshiBanks = [
    'Agrani Bank Limited',
    'Bangladesh Bank',
    'Bangladesh Development Bank Limited',
    'BASIC Bank Limited',
    'Bengal Commercial Bank Limited',
    'BRAC Bank Limited',
    'City Bank Limited',
    'Commercial Bank of Ceylon PLC',
    'Dhaka Bank Limited',
    'Dutch-Bangla Bank Limited',
    'Eastern Bank Limited',
    'Export Import Bank of Bangladesh Limited',
    'First Security Islami Bank Limited',
    'IFIC Bank Limited',
    'Islami Bank Bangladesh Limited',
    'Jamuna Bank Limited',
    'Janata Bank Limited',
    'Mercantile Bank Limited',
    'Mutual Trust Bank Limited',
    'National Bank Limited',
    'NCC Bank Limited',
    'NRB Bank Limited',
    'NRB Commercial Bank Limited',
    'One Bank Limited',
    'Padma Bank Limited',
    'Premier Bank Limited',
    'Prime Bank Limited',
    'Pubali Bank Limited',
    'Rupali Bank Limited',
    'Shahjalal Islami Bank Limited',
    'Social Islami Bank Limited',
    'Sonali Bank Limited',
    'South Bangla Agriculture & Commerce Bank Limited',
    'Southeast Bank Limited',
    'Standard Bank Limited',
    'Trust Bank Limited',
    'United Commercial Bank Limited',
    'Uttara Bank Limited'
  ];

  return (
    <div className="space-y-8">
      {/* Primary Bank Account */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Bank Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name *</Label>
              <Input
                id="accountHolderName"
                value={bankData.primaryBank.accountHolderName}
                onChange={(e) => updatePrimaryBank('accountHolderName', e.target.value)}
                placeholder="Enter account holder name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={bankData.primaryBank.accountNumber}
                onChange={(e) => updatePrimaryBank('accountNumber', e.target.value)}
                placeholder="Enter account number"
              />
            </div>
            <div className="space-y-2">
              <Label>Bank Name *</Label>
              <Select 
                value={bankData.primaryBank.bankName} 
                onValueChange={(value) => updatePrimaryBank('bankName', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {bangladeshiBanks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name *</Label>
              <Input
                id="branchName"
                value={bankData.primaryBank.branchName}
                onChange={(e) => updatePrimaryBank('branchName', e.target.value)}
                placeholder="Enter branch name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={bankData.primaryBank.routingNumber}
                onChange={(e) => updatePrimaryBank('routingNumber', e.target.value)}
                placeholder="Enter routing number"
              />
            </div>
            <div className="space-y-2">
              <Label>Account Type *</Label>
              <Select 
                value={bankData.primaryBank.accountType} 
                onValueChange={(value) => updatePrimaryBank('accountType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="current">Current Account</SelectItem>
                  <SelectItem value="salary">Salary Account</SelectItem>
                  <SelectItem value="fixed">Fixed Deposit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="swiftCode">SWIFT Code (for international transfers)</Label>
              <Input
                id="swiftCode"
                value={bankData.primaryBank.swiftCode}
                onChange={(e) => updatePrimaryBank('swiftCode', e.target.value)}
                placeholder="Enter SWIFT code"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Bank Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Additional Bank Accounts</CardTitle>
          <Button onClick={addAdditionalBank} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Bank Account
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {bankData.additionalBanks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No additional bank accounts added yet.
            </p>
          ) : (
            bankData.additionalBanks.map((bank, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Bank Account {index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAdditionalBank(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Holder Name</Label>
                    <Input
                      value={bank.accountHolderName}
                      onChange={(e) => updateAdditionalBank(index, 'accountHolderName', e.target.value)}
                      placeholder="Enter account holder name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      value={bank.accountNumber}
                      onChange={(e) => updateAdditionalBank(index, 'accountNumber', e.target.value)}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Select 
                      value={bank.bankName} 
                      onValueChange={(value) => updateAdditionalBank(index, 'bankName', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {bangladeshiBanks.map((bankName) => (
                          <SelectItem key={bankName} value={bankName}>
                            {bankName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Branch Name</Label>
                    <Input
                      value={bank.branchName}
                      onChange={(e) => updateAdditionalBank(index, 'branchName', e.target.value)}
                      placeholder="Enter branch name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select 
                      value={bank.accountType} 
                      onValueChange={(value) => updateAdditionalBank(index, 'accountType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="salary">Salary Account</SelectItem>
                        <SelectItem value="fixed">Fixed Deposit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Routing Number</Label>
                    <Input
                      value={bank.routingNumber}
                      onChange={(e) => updateAdditionalBank(index, 'routingNumber', e.target.value)}
                      placeholder="Enter routing number"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tinNumber">e-TIN Number</Label>
              <Input
                id="tinNumber"
                value={bankData.taxInfo.tinNumber}
                onChange={(e) => updateTaxInfo('tinNumber', e.target.value)}
                placeholder="Enter e-TIN number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxCircle">Tax Circle</Label>
              <Input
                id="taxCircle"
                value={bankData.taxInfo.taxCircle}
                onChange={(e) => updateTaxInfo('taxCircle', e.target.value)}
                placeholder="Enter tax circle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxZone">Tax Zone</Label>
              <Input
                id="taxZone"
                value={bankData.taxInfo.taxZone}
                onChange={(e) => updateTaxInfo('taxZone', e.target.value)}
                placeholder="Enter tax zone"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Recent Tax Acknowledgement Slip</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <Button variant="outline" className="mb-2">
                  Choose File
                </Button>
                <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
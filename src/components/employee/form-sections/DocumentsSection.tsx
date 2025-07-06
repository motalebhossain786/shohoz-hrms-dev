import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DocumentsProps {
  data?: any;
  onUpdate: (data: any) => void;
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  category: string;
  size?: string;
  uploadDate?: Date;
  file?: File | null;
}

export const DocumentsSection: React.FC<DocumentsProps> = ({ data, onUpdate }) => {
  const [documentsData, setDocumentsData] = useState({
    uploadedDocuments: [] as DocumentItem[],
    ...data
  });

  const documentCategories = [
    { 
      id: 'identity',
      title: 'Identity Documents',
      required: true,
      types: ['National ID', 'Passport', 'Birth Certificate', 'Driving License']
    },
    {
      id: 'education',
      title: 'Educational Documents',
      required: true,
      types: ['Academic Transcripts', 'Degree Certificate', 'Professional Certificate']
    },
    {
      id: 'employment',
      title: 'Employment Documents',
      required: false,
      types: ['Resume/CV', 'Experience Letter', 'Salary Certificate', 'Reference Letter']
    },
    {
      id: 'medical',
      title: 'Medical Documents',
      required: false,
      types: ['Medical Certificate', 'Vaccination Certificate', 'Health Insurance']
    },
    {
      id: 'financial',
      title: 'Financial Documents',
      required: true,
      types: ['Bank Statement', 'Tax Certificate', 'Salary Slip']
    },
    {
      id: 'photos',
      title: 'Photographs',
      required: true,
      types: ['Passport Size Photo', 'Profile Picture']
    },
    {
      id: 'other',
      title: 'Other Documents',
      required: false,
      types: ['Police Clearance', 'Character Certificate', 'Other']
    }
  ];

  const handleFileUpload = (category: string, documentType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocument: DocumentItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: documentType,
        category: category,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadDate: new Date(),
        file: file
      };

      const updated = {
        ...documentsData,
        uploadedDocuments: [...documentsData.uploadedDocuments, newDocument]
      };
      
      setDocumentsData(updated);
      onUpdate(updated);
    }
  };

  const removeDocument = (documentId: string) => {
    const updated = {
      ...documentsData,
      uploadedDocuments: documentsData.uploadedDocuments.filter(doc => doc.id !== documentId)
    };
    
    setDocumentsData(updated);
    onUpdate(updated);
  };

  const previewDocument = (document: DocumentItem) => {
    // Simulate document preview functionality
    alert(`Preview: ${document.name}\nType: ${document.type}\nSize: ${document.size}`);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const getDocumentsByCategory = (categoryId: string) => {
    return documentsData.uploadedDocuments.filter(doc => doc.category === categoryId);
  };

  const getCategoryCompletionStatus = (category: any) => {
    const documents = getDocumentsByCategory(category.id);
    if (category.required && documents.length === 0) {
      return { status: 'required', color: 'destructive' };
    } else if (documents.length > 0) {
      return { status: 'completed', color: 'success' };
    } else {
      return { status: 'optional', color: 'secondary' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Document Upload Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Document Upload Summary
            <Badge variant="outline" className="text-primary border-primary">
              {documentsData.uploadedDocuments.length} Documents Uploaded
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {documentCategories.map((category) => {
              const completion = getCategoryCompletionStatus(category);
              const count = getDocumentsByCategory(category.id).length;
              
              return (
                <div key={category.id} className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{count}</div>
                  <div className="text-sm text-muted-foreground">{category.title}</div>
                  <Badge 
                    variant={completion.color === 'success' ? 'default' : 'secondary'}
                    className={`mt-1 text-xs ${
                      completion.color === 'success' ? 'bg-success/10 text-success' :
                      completion.color === 'destructive' ? 'bg-destructive/10 text-destructive' :
                      'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {completion.status === 'required' ? 'Required' : 
                     completion.status === 'completed' ? 'Complete' : 'Optional'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      {documentCategories.map((category) => {
        const categoryDocuments = getDocumentsByCategory(category.id);
        const completion = getCategoryCompletionStatus(category);
        
        return (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {category.title}
                  {category.required && (
                    <Badge 
                      variant={completion.status === 'completed' ? 'default' : 'destructive'}
                      className={completion.status === 'completed' ? 'bg-success/10 text-success' : ''}
                    >
                      {completion.status === 'completed' ? 'Complete' : 'Required'}
                    </Badge>
                  )}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {categoryDocuments.length} document(s) uploaded
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.types.map((docType) => (
                  <div key={docType} className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <div className="text-sm font-medium mb-2">{docType}</div>
                    <input
                      type="file"
                      id={`${category.id}-${docType.replace(/\s+/g, '-')}`}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(category.id, docType, e)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.getElementById(`${category.id}-${docType.replace(/\s+/g, '-')}`) as HTMLInputElement;
                        input?.click();
                      }}
                    >
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, JPG, PNG up to 10MB
                    </p>
                  </div>
                ))}
              </div>

              {/* Uploaded Documents for this Category */}
              {categoryDocuments.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Documents:</Label>
                  <div className="space-y-2">
                    {categoryDocuments.map((document) => (
                      <div key={document.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.name)}
                          <div>
                            <div className="font-medium text-sm">{document.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {document.type} • {document.size} • 
                              {document.uploadDate && ` Uploaded ${document.uploadDate.toLocaleDateString()}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => previewDocument(document)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeDocument(document.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Bulk Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <div className="text-lg font-medium mb-2">Drop multiple files here</div>
            <div className="text-muted-foreground mb-4">
              or click to browse and select multiple documents at once
            </div>
            <input
              type="file"
              id="bulkUpload"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach((file, index) => {
                  // Simulate bulk upload - in real app, you'd categorize each file
                  const event = { target: { files: [file] } } as any;
                  handleFileUpload('other', 'Bulk Upload', event);
                });
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                const input = document.getElementById('bulkUpload') as HTMLInputElement;
                input?.click();
              }}
            >
              Select Multiple Files
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
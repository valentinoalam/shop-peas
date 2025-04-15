import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { X, ExternalLink, Trash2 } from 'lucide-react';
import { useBusiness } from '@/context/business-context';

const BusinessDetail: React.FC = () => {
  const { selectedBusiness, setSelectedBusiness, removeBusiness } = useBusiness();

  if (!selectedBusiness) return null;

  const handleClose = () => {
    setSelectedBusiness(null);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this business?')) {
      removeBusiness(selectedBusiness.id);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{selectedBusiness.name}</CardTitle>
            <CardDescription>{selectedBusiness.category}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Badge variant="outline" className="mt-2">{selectedBusiness.category}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-1">Description</h4>
          <p className="text-sm">{selectedBusiness.description}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-1">Address</h4>
          <p className="text-sm">{selectedBusiness.address}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-1">Contact</h4>
          <p className="text-sm">{selectedBusiness.contact}</p>
        </div>
        
        {selectedBusiness.website && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Website</h4>
            <a 
              href={selectedBusiness.website.startsWith('http') ? selectedBusiness.website : `https://${selectedBusiness.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm flex items-center gap-1"
            >
              {selectedBusiness.website}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-semibold mb-1">Location</h4>
          <p className="text-sm">
            Lat: {selectedBusiness.position[0].toFixed(6)}, Lng: {selectedBusiness.position[1].toFixed(6)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-between pt-2">
        <span className="text-xs text-gray-400">
          Added {formatDistanceToNow(new Date(selectedBusiness.createdAt), { addSuffix: true })}
        </span>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessDetail;

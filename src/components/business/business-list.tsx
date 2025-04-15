import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { useBusiness } from '@/context/business-context';
import { ScrollArea } from '../ui/scroll-area';

const BusinessList: React.FC = () => {
  const { businesses, setSelectedBusiness, selectedBusiness } = useBusiness();

  if (businesses.length === 0) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-medium">No businesses yet</h3>
        <p className="text-sm text-gray-500 mt-2">
          Click on the map to add your first business location
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 -mx-6">
      <div className="space-y-4 px-2 overflow-auto max-h-[calc(100vh-12rem)]">
        {businesses.map((business) => (
          <Card 
            key={business.id} 
            className={`cursor-pointer transition-all ${selectedBusiness?.id === business.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedBusiness(business)}
          >
            <CardHeader className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">{business.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{business.category}</CardDescription>
                </div>
                <Badge variant="outline" className="text-sm text-muted-foreground">{business.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm line-clamp-2">{business.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>{business.address}</p>
                <p className="mt-1">{business.contact}</p>
                {business.website && (
                  <a 
                    href={business.website.startsWith('http') ? business.website : `https://${business.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-1 block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Website
                  </a>
                )}
              </div>
            </CardContent>
            <CardFooter className="py-3 text-xs text-gray-400">
              Added {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default BusinessList;

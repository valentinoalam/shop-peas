
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import { businessFormSchema, NewBusiness } from '@/types/business';
import { useBusiness } from '@/context/business-context';
import { Form } from '../ui/form';

interface BusinessFormProps {
  position: [number, number] | null;
  onCancel: () => void;
}

const BUSINESS_CATEGORIES = [
  'Retail',
  'Restaurant',
  'Healthcare',
  'Tech',
  'Education',
  'Finance',
  'Real Estate',
  'Entertainment',
  'Other'
];

const BusinessForm: React.FC<BusinessFormProps> = ({ position, onCancel }) => {
  // const [open, setOpen] = useState(false);
  const { addBusiness } = useBusiness();
  const initialValue = {
    name: '',
    description: '',
    category: 'Other',
    address: '',
    contact: '',
    website: ''
  };
  const [formData, setFormData] = useState<Omit<NewBusiness, 'position'>>(initialValue);

  const form = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: initialValue,
  });

  const onSubmit = (values: typeof initialValue) => {

    if (!position) return;

    addBusiness({
      ...values,
      position
    });
    form.reset();
    // setOpen(false);
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Add Your Business</h2>
          {position && (
            <p className="text-sm text-gray-500">
              Selected Location: {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Business Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your business"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            name="address" 
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter business address"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Contact</Label>
          <Input 
            id="contact" 
            name="contact" 
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone or email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input 
            id="website" 
            name="website" 
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!position}>
            Add Business
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessForm;
{/* <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger asChild>
  <Button className="w-full">
    <Plus className="mr-2 h-4 w-4" />
    Add New Place
  </Button>
</DialogTrigger>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Add New Place</DialogTitle>
  </DialogHeader>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Place name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Place description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="attraction">Attraction</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input placeholder="51.505" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input placeholder="-0.09" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="submit" className="w-full">Add Place</Button>
    </form>
  </Form>
</DialogContent>
</Dialog> */}
import React from 'react'
import { MagicButton } from '@/components/ui/magic-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Send, Building2, Users, Target, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { whatsappNumber } from './content';

const formSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  aboutBusiness: z.string().min(50, 'Please provide at least 50 characters about your business'),
  targetMarket: z.string().min(30, 'Please describe your target market (min. 30 characters)'),
  websitePurpose: z.string().min(30, 'Please describe your website purpose (min. 30 characters)'),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;
function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      aboutBusiness: '',
      targetMarket: '',
      websitePurpose: '',
      additionalInfo: '',
    },
  });

  const onSubmit = (data: FormData) => {
    // Format the message for WhatsApp
    const message = `
      *New Business Inquiry*
      ------------------
      *Business Name:* ${data.businessName}
      *Contact Person:* ${data.contactName}
      *Email:* ${data.email}
      *Phone:* ${data.phone}

      *About the Business:*
      ${data.aboutBusiness}

      *Target Market:*
      ${data.targetMarket}

      *Website Purpose:*
      ${data.websitePurpose}

      *Additional Information:*
      ${data.additionalInfo || 'None provided'}
    `.trim();

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    // Replace with your business phone number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 contact-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Business Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Your business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Contact Person
              </FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Phone
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="aboutBusiness"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              About Your Business
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us about your business mission, vision, and values..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetMarket"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Target Market
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your target audience (age, location, interests, etc.)..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="websitePurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website Purpose
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What are your main goals for the website?"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Additional Information
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any other details you'd like to share..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-center">
        <MagicButton type="submit" size="lg" className="group">
          Teruskan ke WhatsApp
          <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </MagicButton>
      </div>
    </form>
  </Form>
  )
}

export default ContactForm
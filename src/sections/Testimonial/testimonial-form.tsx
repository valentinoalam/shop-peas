"use client"

import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"
import Image from "next/image"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  image: z
  .instanceof(FileList)
  .refine((files) => files.length > 0, "Image is required.")
  .refine(
    (files) => Array.from(files).every((file) => file.type.startsWith("image/")),
    "Only image files are allowed."
  )
  .refine(
    (files) => Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
    "Image size should be less than 5MB."
  ).optional(),
  quote: z.string()
    .min(10, {
      message: "Testimonial must be at least 10 characters.",
    })
    .max(500, {
      message: "Testimonial must not exceed 500 characters.",
    }).optional(),
  rating: z.string().min(1, {
    message: "Please select a rating.",
  }),
})

export function TestimonialForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      image: undefined,
      quote: "",
      rating: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          rating: Number.parseInt(values.rating),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit testimonial")
      }

      toast({
        title: "Testimonial submitted!",
        description: "Thank you for sharing your experience. Your testimonial will be reviewed shortly.",
      })

      form.reset()
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: "Something went wrong",
        description: "Your testimonial couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const removeImage = () => {
    setPreview(null);
    form.setValue("image", undefined);
    form.clearErrors("image");
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="CEO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 Stars - Excellent</SelectItem>
                        <SelectItem value="4">4 Stars - Very Good</SelectItem>
                        <SelectItem value="3">3 Stars - Good</SelectItem>
                        <SelectItem value="2">2 Stars - Fair</SelectItem>
                        <SelectItem value="1">1 Star - Poor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Testimonial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience working with us..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Maximum 500 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {!preview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 text-center">
                          SVG, PNG, JPG or GIF (max. 5MB)
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const files = e.target.files;
                            field.onChange(files);
                            handleImageChange(files);
                          }}
                          // Remove the value prop which causes the TypeScript error
                        />
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden">
                        <Image 
                          src={preview} 
                          alt="Preview" 
                          width={200} height={192}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload an image for your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


/**
 * <form onSubmit={handleSubmit} className="space-y-6">
  <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
      </label>
      <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
  </div>

  <div>
      <label htmlFor="quote" className="block text-sm font-medium text-gray-700">
          Your Testimonial
      </label>
      <textarea
          name="quote"
          id="quote"
          rows={4}
          required
          value={formData.quote}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      ></textarea>
  </div>

  <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Profile Image URL (optional)
      </label>
      <input
          type="url"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
  </div>

  <div className="text-center">
      <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
      </button>
  </div>

  {submitError && (
      <div className="text-red-500 text-center mt-4">{submitError}</div>
  )}

  {submitSuccess && (
      <div className="text-green-500 text-center mt-4">
          Thank you for your submission!
      </div>
  )}
</form>
 */
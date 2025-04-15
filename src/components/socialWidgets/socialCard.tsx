import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"

// Card component for each social media widget
export default function SocialCard({
    title,
    description,
    icon,
    children,
    isLoading,
  }: {
    title: string
    description: string
    icon: React.ReactNode
    children: React.ReactNode
    isLoading: boolean
  }) {
    return (
      <Card className="overflow-hidden p-2 border rounded-lg space-y-3 y-max shadow-sm">
        <CardHeader className="flex flex-row relative h-12 items-center gap-2 m-2 pb-2">
          <div className="absolute top-0 left-0 bg-primary/10 rounded-full">{icon}</div>
          <div className="absolute top-0 left-1/2 w-max text-center -translate-x-1/2">
            <CardTitle className="text-lg font-semibold md:text-2xl md:font-bold mb-3">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 w-full h-max">
          {isLoading ? (
            <div className="flex items-center justify-center h-[100px] bg-muted/30 animate-pulse rounded-md">
              <p className="text-muted-foreground">Loading widget...</p>
            </div>
          ) : (
            children
          )}
        </CardContent>
      </Card>
    )
}
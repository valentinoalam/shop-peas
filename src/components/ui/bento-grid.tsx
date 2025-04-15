
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MagicCard } from "./magic-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}
 
interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta: string;
}

const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  cta,
}: BentoCardProps) => (
<Popover>
  <MagicCard
    key={name}
    className={cn(
      "group relative w-full h-full col-span-3 px-4 sm:px-8 py-4 sm:py-6 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div className="h-full w-full">{background}</div>
    <div className="z-10 w-full items-center flex flex-col min-sm:flex-row gap-1 p-3 sm:p-6 transition-all duration-300 pointer-events-none transform-gpu group-hover:-translate-y-10">
      {Icon && (
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 ease-in-out origin-left transform-gpu text-neutral-700 group-hover:scale-75" />
      )}
      <h3 className="text-base sm:text-xl font-semibold text-neutral-700 dark:text-neutral-300 line-clamp-2 sm:line-clamp-none">
        {name}
      </h3>
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-2 sm:p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="pointer-events-auto text-xs sm:text-sm">
          {cta} <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
        </Button>
      </PopoverTrigger>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </MagicCard>
  <PopoverContent className="w-full max-w-xs sm:w-80">
    <div className="space-y-2">
      <h3 className="font-medium leading-tight text-sm sm:text-base">{name}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  </PopoverContent>
</Popover>
);

export { BentoCard, BentoGrid };

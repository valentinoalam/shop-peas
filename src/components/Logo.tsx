// import Image from 'next/image';
import KaryaLogo from './logo/Karya';
import { cn } from '@/lib/utils';
import Tino from './logo/Tino';
const Logo = ({className}: {className?: string;}) => {
  return (
      <div className={cn(className,"relative flex h-2/5 w-max")}>
        {/* Tino logo */}
        <Tino 
          className="relative w-32 h-6 self-center aspect-auto transition-transform duration-300 transform drop-shadow-lg hover:scale-105" />
        {/* Karya logo */}
        <KaryaLogo
          className="self-end h-auto ml-1 transition-transform duration-300 transform w-28 drop-shadow-lg hover:scale-105"
        />
      </div>
  );
};

export default Logo;
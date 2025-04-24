import Image from "next/image";
import { useMDXComponent } from "next-contentlayer2/hooks";

interface MdxProps {
  code: string;
}

const components = {
  Image,
};

export function Mdx({ code }: MdxProps) {
  const MDXComponent = useMDXComponent(code);

  return <MDXComponent components={components} />;
}

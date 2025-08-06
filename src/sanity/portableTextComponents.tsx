// src/sanity/portableTextComponents.tsx
import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // 1) Bail out early if there's no valid asset reference
      if (!value?.asset?._ref) {
        console.warn("Skipping PortableText image block with no asset:", value);
        return null;
      }

      // 2) Build the URL once we know we have something safe
      const imgUrl = urlFor(value)
        .width(600)
        .height(400)
        .quality(80)
        .auto("format")
        .url(); // now we know this won't throw

      // 3) Render with numeric width/height
      return (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={imgUrl}
          alt={value.alt || ""}
          width={600}
          height={400}
        />
      );
    },
  },
};

import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
    matcher: string;
    /** @description text to be rendered on top of the image */
    title?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
    image: {
        /** @description Image for big screens */
        desktop: ImageWidget;
        /** @description Image for small screens */
        mobile: ImageWidget;
        /** @description image alt text */
        alt?: string;
    };
}
const DEFAULT_PROPS = {
    banners: [
        {
            image: {
                mobile: "https://decoims.com/investors/d9affe01-28c8-4f40-8e6e-31edd7f077ac/7ee0ee2e45e2e5d4.png",
                desktop: "https://decoims.com/investors/fcd19909-8909-469a-af55-2ee2fc5a31ee/2cf8c9a31c6df315.png",
                alt: "a",
            },
            title: "Woman",
            matcher: "/*",
            subtitle: "As",
        },
    ],
};
function Banner(props: SectionProps<ReturnType<typeof loader>>) {
    const { banner } = props;
    if (!banner) {
        return null;
    }
    const { title, subtitle, image } = banner;
    return (<div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source src={image.mobile} width={360} height={120} media="(max-width: 767px)"/>
        <Source src={image.desktop} width={1440} height={200} media="(min-width: 767px)"/>
        <Image class="w-full" src={image.desktop} alt={image.alt ?? title} width={1440} height={200}/>
      </Picture>

      <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        <h1>
          <span class="text-5xl font-medium text-base-100">
            {title}
          </span>
        </h1>
        <h2>
          <span class="text-xl font-medium text-base-100">
            {subtitle}
          </span>
        </h2>
      </div>
    </div>);
}
export interface Props {
    banners?: Banner[];
}
export const loader = (props: Props, req: Request) => {
    const { banners } = { ...DEFAULT_PROPS, ...props };
    const banner = banners.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { banner };
};
export default Banner;

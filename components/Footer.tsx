import Image from 'next/image'
import Link from 'next/link'

import { footerLinks } from '@/constants'

type ColumnProps = {
  title: string
  links: Array<{ title: string; url: string }>
}

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex-1 flex flex-col gap-2 md:text-sm text-xm min-w-max">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-1 font-normal  ">
      {links.map((link) => (
        <a href={link.url} key={link.url} className="hover:text-gray-400 ">
          {link.title}
        </a>
      ))}
    </ul>
  </div>
)

const Footer = () => (
  <section className="px-8 flex items-center justify-start flex-col paddings w-full gap-20 bg-light-white border-t border-t-primary/30 ">
    <div className="flex flex-col gap-8 w-full text-xs md:text-sm lg:text-base ">
      <div className="flex items-start flex-col">
        {/* <Image src="/logo-purple.svg" width={116} height={38} alt="logo" /> */}

        <p className="text-start text-sm font-normal mt-5 max-w-xs">
          {/* Flexibble is the world&apos;s leading community for creatives to
          share, grow, and get hired. */}
          درمانگاه شبانه روزی آیین شفق
        </p>
      </div>
      <div className="flex flex-wrap gap-12">
        <FooterColumn
          title={footerLinks[0].title}
          links={footerLinks[0].links}
        />

        <div className="flex-1 flex flex-col gap-4 flex-wrap  ">
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 flex-wrap  ">
          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 flex-wrap  ">
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
        </div>

        {/* <FooterColumn
          title={footerLinks[3].title}
          //   links={footerLinks[3].links.url}
        />

        <div className="flex-1 flex flex-col gap-4">
          <FooterColumn
            title={footerLinks[4].title}
            // links={footerLinks[4].links.url}
          />
          <FooterColumn
            title={footerLinks[5].title}
            // links={footerLinks[5].links.url}
          />
        </div>

        <FooterColumn
          title={footerLinks[6].title}
          //   links={footerLinks[6].links.url}
        /> */}
      </div>
    </div>

    <div className="flex justify-between items-center max-sm:flex-col w-full text-sm font-normal  ">
      <p className="text-center">@ 2023 Saeid. All rights reserved</p>
      {/* <p className="text-gray">
        <span className="text-black font-semibold">10,214</span> projects
        submitted
      </p> */}
    </div>
  </section>
)

export default Footer

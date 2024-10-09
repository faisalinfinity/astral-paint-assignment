import { client } from "@/lib/graphql-client";
import { GET_HOMEPAGE_DATA } from "@/lib/queries";
import { Blog, ColourCategory, HomePageData } from "@/lib/types";
import Image from "next/image";

interface seoI {
  title: string;
  metaDesc: string;
  schema: { raw: string };
  opengraphImage: { mediaItemUrl: string };
  opengraphUrl: string;
  opengraphType: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    images: [
      {
        url: string;
        width: number;
        height: number;
      }
    ];
  };
}

export async function generateMetadata() {
  const data: {
    pages: { nodes: { homepage: HomePageData, seo: seoI }[] };
  } = await client.request(GET_HOMEPAGE_DATA);

  const seo = data.pages.nodes[0].seo;
  console.log(seo, "seo")

  const metaObj = {
    title: seo?.title,
    description: seo?.metaDesc,
    schema: { raw: seo?.schema?.raw },
    openGraph: {
      title: seo?.title,
      description: seo?.metaDesc,
      url: seo?.opengraphUrl,
      type: seo?.opengraphType,
      images: [
        {
          url: seo?.opengraphImage?.mediaItemUrl,
          width: 800,
          height: 600
        }
      ]
    },

  }

  return metaObj;
}

export default async function Home() {
  const data: {
    pages: { nodes: { homepage: HomePageData }[] };
    allColourCategory: { nodes: ColourCategory[] };
    blogs: { nodes: Blog[] };
  } = await client.request(GET_HOMEPAGE_DATA);


  // console.log(data.pages.nodes);
  // console.log(data.pages.nodes[0]?.homepage.homeColoursButton);

  const homepage = data.pages.nodes[0].homepage;
  // const banners = data.pages.nodes[0]?.homepage.banners;
  // const colourCategories = data.allColourCategory.nodes;
  // const blogs = data.blogs.nodes;

  // console.log(homepage, banners, colourCategories, blogs)

  return (
    <div className="w-full min-h-screen bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <header className="w-full h-[100px] bg-[#0060af] flex items-center justify-between px-20">
        <Image height={500} width={500} alt={"logo"}
          src="/astral-paints-logo-ol-23.png"
          className="w-[150px] h-auto object-cover"
        />
        <nav className="flex space-x-6">
          {[
            "About",
            "Category",
            "Services",
            "Colours",
            "Downloads",
            "Become a dealer",
            "Blogs",
            "Contact",
          ].map((item) => (
            <NavItem key={item}>{item}</NavItem>
          ))}
        </nav>
        <button className="px-4 py-2 rounded-[20px] bg-white text-xs font-semibold text-[#0060af]">
          Enquire Now
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative h-[777px] bg-[#d9d9d9]">
        <Image alt="hero" height={500} width={500} src="/4444-1.png" className="w-full h-full object-cover" />
        <Image alt="background" height={500} width={500} className="w-full h-full absolute inset-0" src="/2idg31-1.png" />
        <div className="absolute left-20 top-1/4 text-white">
          <h1 className="text-[50px] font-bold">
            Interior
            <br />
            Emulsions
          </h1>
          <p className="mt-4 text-base capitalize">
            Excellent fungal resistance | smooth finish
          </p>
          <button className="mt-8 px-4 py-2 rounded-[20px] bg-white text-xs font-semibold text-[#5e4d7a]">
            Read More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="flex px-20 py-16 relative">
        <div className="w-1/2 pr-8">
          <h2 className="text-lg font-medium">{homepage.homeAboutSubtitle}</h2>
          <h3 className="text-3xl font-bold mt-2 capitalize">
            {homepage.homeAboutTitle}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: homepage?.homeAboutDescription }} className="mt-4 text-base text-[#656565]">

          </div>

          <button className="mt-8 px-4 py-2 rounded-[20px] border border-[#e70000] text-xs font-semibold text-[#e70000]">
            Read More
          </button>
        </div>
        <div className="w-1/2 relative">

          <Image alt={homepage.homeAboutVideoImage?.node.sourceUrl} height={500} width={500}
            src={homepage.homeAboutVideoImage?.node.sourceUrl}
            className="w-full h-auto absolute top-0 left-0 object-cover"
          />
        </div>
        <div className="w-[15px] h-full absolute left-0 top-0 bg-[#e70000]" />
      </section>

      {/* Category Section */}
      <section className="px-20 py-16 relative">
        <h2 className="text-lg font-medium">Category</h2>
        <h3 className="text-3xl font-bold mt-2 capitalize">
          {homepage.homeCategoryTitle}
        </h3>
        <div className="grid grid-cols-4 gap-8 mt-8">
          <div className="col-span-2 row-span-2">
            <CategoryCard
              type={2}
              image="/rectangle-52.png"
              title="Interior Paints"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <CategoryCard
              type={1}
              image="/image-10.png"
              title="Exterior Paints"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <CategoryCard type={1} image="/image-11.png" title="Undercoats" />
          </div>

          <div className="col-span-1 row-span-1">
            <CategoryCard
              type={1}
              image="/rectangle-63.png"
              title="Painting Tools"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <CategoryCard
              type={1}
              image="/rectangle-64.png"
              title="Water Proofing"
            />
          </div>
        </div>

        <div className="w-[15px] h-full absolute left-0 top-0 bg-[#ff9119]" />
        <div className="w-[15px] h-[175px] absolute left-3.5 top-[100px] bg-gradient-to-b from-[#ff9119] to-[#e70000]" />
      </section>

      {/* Services Section */}
      <section className="px-20 py-16 relative">
        <h2 className="text-lg font-medium">Services</h2>
        <h3 className="text-3xl font-bold mt-2 capitalize">
          make your life comfortable
        </h3>
        <div className="grid grid-cols-3 gap-8 mt-8">
          <ServiceCard
            image="/image-20.png"
            title="Wall Painting"
            description="Lorem ipsum dolor sit amet consectetur."
          />
          <ServiceCard
            image="/rectangle-10.png"
            title="Water Solution"
            description="Lorem ipsum dolor sit amet consectetur."
          />
          <ServiceCard
            image="/rectangle-10.png"
            title="Painting"
            description="Lorem ipsum dolor sit amet consectetur."
          />
        </div>
        <div className="w-[15px] h-full absolute left-0 top-0 bg-[#f5e847]" />
      </section>

      {/* Colours Section */}
      <section className="px-20 py-16 relative">
        <h2 className="text-lg font-medium">Colours</h2>
        <div className="flex justify-between">
          {" "}
          <h3 className="text-3xl font-bold mt-2 capitalize">
            Popular Colours
          </h3>{" "}
          <button className="mt-8 px-4 py-2 rounded-[20px] border border-[#00ae44] text-xs font-semibold text-[#00ae44]">
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-8">
          <ColourCard bg="bg-[#fae0b2]" name="Colour Name" code="Colour Code" />
          <ColourCard bg="bg-[#fbc9c3]" name="Colour Name" code="Colour Code" />
          <ColourCard bg="bg-[#00c1de]" name="Colour Name" code="Colour Code" />
          <ColourCard bg="bg-[#0060af]" name="Colour Name" code="Colour Code" />
          <ColourCard bg="bg-[#800404]" name="Colour Name" code="Colour Code" />
          <ColourCard bg="bg-[#eca628]" name="Colour Name" code="Colour Code" />
        </div>

        <div className="w-[15px] h-full absolute left-0 top-0 bg-[#00ae44]" />
      </section>

      {/* Become a Dealer Section */}
      <section className="bg-[url(/mortar-background-cement-texture-wall-2.jpeg)] px-20 py-16 flex flex-col items-center justify-center text-white relative">
        <h2 className="text-lg font-medium">Join the Success Journey</h2>
        <h3 className="text-3xl font-bold mt-2 capitalize">Become a Dealer</h3>
        <p className="mt-4 text-base text-center max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Integer dui quam nisi in
          ornare. Nec in tristique et ultrices sit ullamcorper massa tempor et.
        </p>
        <button className="mt-8 px-4 py-2 rounded-[20px] bg-white text-xs font-semibold text-black">
          Read More
        </button>
        <div className="w-[15px] h-full absolute left-0 top-0 bg-[#00c1de]" />
      </section>

      {/* Blog Section */}
      <section className="px-20 py-16 relative">
        <h2 className="text-lg font-medium">Our Blog</h2>
        <h3 className="text-3xl font-bold mt-2 capitalize">Latest</h3>
        <div className="grid grid-cols-3 gap-8 mt-8">
          <BlogCard
            image="/rectangle-31.png"
            date="10 Jan 2024"
            title="How to choose the perfect wallcolour for your office"
          />
          <div className="row-span-2">
            <BlogCard
              image="/rectangle-66.png"
              date="20 Jan 2024"
              title="10 stylish cream colour combination for your home"
            >
              <button className="mt-4 px-4 py-2 rounded-[20px] bg-white text-xs font-semibold text-[#00c1de]">
                Read More
              </button>
            </BlogCard>
          </div>
          <BlogCard
            image="/rectangle-68.png"
            date="10 Jan 2024"
            title="How to choose the perfect wallcolour for your office"
          />
          <BlogCard
            image="/rectangle-31.png"
            date="10 Jan 2024"
            title="How to choose the perfect wallcolour for your office"
          />
          <BlogCard
            image="/rectangle-31.png"
            date="10 Jan 2024"
            title="How to choose the perfect wallcolour for your office"
          />
        </div>
        <div className="w-[15px] h-full absolute left-0 top-0 bg-teal-500" />
      </section>

      {/* Footer */}
      <div className="bg-[url(/rectangle-82.png)] bg-cover bg-center]">
        <h3 className="text-center text-white text-2xl font-bold p-4">
          Group Company
        </h3>
        <div className="flex items-center justify-center py-10 px-2">
          <Image height={16}
            width={161}
            alt="brand"
            src="/image-15.png"
            className="w-[161px] h-16  left-[171.5px] top-[4360.5px] object-cover"
          />
          <Image height={16}
            width={161}
            alt="brand"
            src="/image-16.png"
            className="w-40 h-16 left-[387.5px] top-[4360.5px] object-cover"
          />
          <Image
            height={16}
            width={161}
            alt="brand"
            src="/image-17.png"
            className="w-[161px] h-16  left-[602.5px] top-[4360.5px] object-cover"
          />
          <Image
            height={16}
            width={161}
            alt="brand"
            src="/image-18.png"
            className="w-40 h-[46px]  left-[818.5px] top-[4369.5px] object-cover"
          />
          <Image
            height={16}
            width={161}
            alt="brand"
            src="/image-19.png"
            className="w-[161px] h-16  left-[1033.5px] top-[4360.5px] object-cover"
          />
        </div>
        <footer className="text-white px-20 py-16">
          <div className="grid grid-cols-5 gap-8">
            <div>
              <Image
                alt="logo"
                height={500}
                width={500}
                src="/astral-paints-logo-ol-23.png"
                className="w-[200px] h-auto object-cover mb-4"
              />
              <p className="text-xs">
                #417/418, 11th Cross, 4th Phase, Peenya Industrial Area,
                Bangalore - 560 058
              </p>
              <p className="text-xs mt-2">+91 – 80 – 42552555</p>
              <p className="text-xs mt-2">info@gem-paints.com</p>
            </div>
            <FooterColumn
              title="About"
              items={["About astrals", "paint journey", "Group Companies"]}
            />
            <FooterColumn
              title="Category"
              items={[
                "interior paints",
                "exterior paints",
                "undercoats",
                "painting tools",
                "water proofing",
              ]}
            />
            <FooterColumn
              title="Services"
              items={[
                "wall painting",
                "water Solution",
                "painting",
                "colour shades",
              ]}
            />
            <div>
              <h4 className="text-sm font-bold mb-4 capitalize text-[#eedcb2]">
                Newsletter
              </h4>
              <p className="text-xs mb-2">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="px-4 py-2 rounded-l-full bg-transparent border border-[#eedcb2] text-xs"
                />
                <button className="px-4 py-2 rounded-r-full bg-[#0060af] text-xs font-semibold text-[#eedbb1]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#eedbb0] flex justify-between items-center">
            <p className="text-xs">Terms & Conditions</p>
            <p className="text-xs">&copy; 2024 ALL RIGHTS RESERVED</p>
            <p className="text-xs">Privacy Policy</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-left capitalize text-white">
      {children}
    </p>
  );
}

interface CategoryCardI {
  image: string;
  title: string;
  type?: number;
}

function CategoryCard({ image, title, type }: CategoryCardI) {
  return (
    <div className="relative h-full w-full">
      <Image alt={title} height={500} width={600} src={image} className="w-full h-full object-cover" />
      {type == 1 ? (
        <p className="absolute bottom-4 left-4 text-xl font-semibold text-white">
          {title}
        </p>
      ) : (
        <div className="bg-[#FF9119] items-center px-2 py-3 w-full absolute bottom-0 flex justify-around">
          <div className=" text-xl font-semibold text-white">{title}</div>{" "}
          <button className="px-4 py-2 rounded-[20px] bg-white text-xs font-semibold text-[#FF9119]">
            Read More
          </button>
        </div>
      )}
    </div>
  );
}

interface ServiceCardI {
  title: string;
  description: string;
  image: string;
}

function ServiceCard({ title, description, image }: ServiceCardI) {
  return (
    <div className="relative h-full w-full ">
      <Image
        alt={title}
        height={500}
        width={600}
        className="object-cover"
        src={image}
      ></Image>
      <div className="absolute bottom-0 bg-[#ffe710]/60 p-4 w-full">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-base">{description}</p>
        <button className="mt-4 px-4 py-2 rounded-[20px] bg-white text-xs font-semibold text-black">
          Read More
        </button>
      </div>
    </div>
  );
}

function ColourCard({ bg, name, code }: { bg: string, name: string, code: string }) {
  return (
    <div className="group">
      <div className="group-hover:hidden p-3 pt-4 bg-white rounded-t-xl rounded-b-xl">
        <h3 className="text-center mb-3 font-bold p-1">
          <span className="hidden group-hover:inline">Astral Paints</span>
        </h3>
        <div className={`${bg} p-4 h-40 flex flex-col justify-end`}></div>
        <p className="text-[15px] text-center text-black">{name}</p>
        <p className="text-sm text-center text-[#656565]">{code}</p>
      </div>
      <div className="hidden group-hover:block p-3 pt-4 bg-white shadow-md rounded-t-xl rounded-b-xl">
        <h3 className="text-center mb-3 font-bold p-1">Astral Paints</h3>
        <div className={`${bg} p-4 h-40 flex flex-col justify-end`}>
          {/* Add any additional content or styling here */}
        </div>
        <p className="text-[15px] text-center text-black">{name}</p>
        <p className="text-sm text-center text-[#656565]">{code}</p>
      </div>
    </div>
  );
}
interface BlogCardI {
  image: string;
  date: string;
  title: string;
  children?: React.ReactNode;
}
function BlogCard({ image, date, title, children }: BlogCardI) {
  return (
    <div className="relative w-full h-full">
      <Image height={500} width={500} alt={title} src={image} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 p-4 w-full text-white">
        <p className="text-sm italic mt-2">{date}</p>
        <h4 className="text-xl font-semibold mt-1">{title}</h4>

        {children}
      </div>
    </div>
  );
}

function FooterColumn({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold mb-4 capitalize text-[#eedcb2]">
        {title}
      </h4>
      {items.map((item, index) => (
        <p key={index} className="text-xs mb-2 capitalize">
          {item}
        </p>
      ))}
    </div>
  );
}

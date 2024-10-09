// lib/types.ts

export interface Banner {
    bannerImage: {
      node: {
        sourceUrl: string;
      };
    };
    bannersTitle: string;
    bannerDescription: string;
    bannerButton: {
      title: string;
      url: string;
      target: string;
    };
  }
  
  export interface HomePageData {
    banners: Banner[];
    homeAboutTitle: string;
    homeAboutSubtitle: string;
   
    homeAboutButton: {
      target: string;
      title: string;
      url: string;
    };
    homeAboutVideoImage: {
      node: {
        sourceUrl: string;
      };
    };
    homeAboutVideoUrl: string;
    homeAboutDescription: string;
    homeCategoryTitle: string;
    homeCategorySubtitle: string;
    homeServicesTitle: string;
    homeServicesSubtitle: string;
    homeColoursTitle: string;
    homeColoursSubtitle: string;
    homeColoursButton: {
      target: string;
      title: string;
      url: string;
    };
    homeJoinBackgroundImage: {
      node: {
        sourceUrl: string;
      };
    };
    homeJoinTitle: string;
    homeJoinSubtitle: string;
    homeJoinButton: {
      target: string;
      title: string;
      url: string;
    };
    homeJoinDescription: string;
    blogTitle: string;
    blogSubtitle: string;
    categories: {
      link: string;
      title: string;
      image: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  }
  
  export interface ColourCategory {
    name: string;
    colours: {
      nodes: {
        title: string;
        slug: string;
        colourInfo: {
          selectColor: string;
          colourRgb: string;
        };
      }[];
    };
  }
  
  export interface Blog {
    featuredImage: {
      node: {
        sourceUrl: string;
        slug: string;
      };
    };
    slug: string;
    title: string;
    date: string;
  }
  
// import React from "react";

// const BlogPage: React.FC = () => {
//   const posts = [1, 2, 3, 4];

//   return (
//     <div className="blogPage">
//       <style>{`
//         .blogPage{
//           width: 100%;
//           margin: 0;
//           padding: 0;
//           background: #fff;
//           overflow-x: hidden;
//           font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .blogHero{
//           width: 100%;
//           height: clamp(280px, 45vw, 650px);
//           background-image:
//             linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
//             url("https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000");
//           background-size: cover;
//           background-position: center;
//           display:flex;
//           align-items:center;
//           justify-content:center;
//           padding: 24px;
//         }

//         .blogHeroTitle{
//           margin: 0;
//           color: #fff;
//           font-weight: 800;
//           letter-spacing: -1px;
//           font-size: clamp(38px, 8vw, 85px);
//           text-align: center;
//           line-height: 1;
//         }

//         .blogSection{
//           width: 100%;
//           padding: 56px 16px;
//         }

//         .blogContainer{
//           max-width: 1100px;
//           margin: 0 auto;
//           width: 100%;
//         }

//         .blogSectionTitle{
//           font-size: clamp(22px, 3.2vw, 36px);
//           font-weight: 800;
//           margin: 0 0 10px;
//           color: #111;
//           text-align: center;
//         }

//         .blogUnderline{
//           width: 60px;
//           height: 2px;
//           background: #00AEEF;
//           margin: 0 auto 34px;
//         }

//         .blogGrid{
//           display: grid;
//           grid-template-columns: repeat(2, minmax(0, 1fr));
//           gap: 28px;
//         }

//         @media (max-width: 640px){
//           .blogSection{ padding: 40px 14px; }
//           .blogGrid{ grid-template-columns: 1fr; gap: 22px; }
//         }

//         .blogCard{ display:block; }

//         .blogImage{
//           width: 100%;
//           height: 280px;
//           object-fit: cover;
//           border-radius: 18px;
//           margin-bottom: 14px;
//           box-shadow: 0 8px 22px rgba(0,0,0,0.12);
//           display: block;
//         }

//         @media (max-width: 640px){
//           .blogImage{ height: 240px; border-radius: 16px; }
//         }

//         .blogTitle{
//           font-size: 20px;
//           font-weight: 800;
//           margin: 0 0 10px;
//           line-height: 1.25;
//           color: #222;
//         }

//         .blogText{
//           font-size: 14px;
//           color: #555;
//           line-height: 1.65;
//           margin: 0;
//         }
//       `}</style>

//       <div className="blogHero">
//         <h1 className="blogHeroTitle">Blog</h1>
//       </div>

//       <section className="blogSection">
//         <div className="blogContainer">
//           <h2 className="blogSectionTitle">Our Latest Blog</h2>
//           <div className="blogUnderline" />

//           <div className="blogGrid">
//             {posts.map((item) => (
//               <a key={item} href="#" className="blogCard">
//                 <img
//                   className="blogImage"
//                   src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1600"
//                   alt="blog"
//                 />
//                 <h3 className="blogTitle">Sample Blog Title Goes Here</h3>
//                 <p className="blogText">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
//                   luctus nec ullamcorper mattis.
//                 </p>
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BlogPage;

import React, { useEffect, useState } from "react";

type BlogPost = {
  title: string;
  description: string;
  image: string;
  link: string;
};

type BlogApiResponse = {
  hero_title: string;
  hero_background_image: string;
  section_title: string;
  posts: BlogPost[];
};

const API_BASE = "http://127.0.0.1:8000";
const BLOG_API = `${API_BASE}/api/blog/`;

const defaultData: BlogApiResponse = {
  hero_title: "Blog",
  hero_background_image:
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000",
  section_title: "Our Latest Blog",
  posts: [
    {
      title: "Sample Blog Title Goes Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1600",
      link: "#",
    },
    {
      title: "Sample Blog Title Goes Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1600",
      link: "#",
    },
    {
      title: "Sample Blog Title Goes Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1600",
      link: "#",
    },
    {
      title: "Sample Blog Title Goes Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1600",
      link: "#",
    },
  ],
};

const BlogPage: React.FC = () => {
  const [pageData, setPageData] = useState<BlogApiResponse>(defaultData);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(BLOG_API);
        if (!res.ok) {
          throw new Error(`Failed to fetch blog data: ${res.status}`);
        }

        const data = await res.json();

        setPageData({
          ...defaultData,
          ...data,
          posts: data?.posts?.length ? data.posts : defaultData.posts,
        });
      } catch (error) {
        console.error("Blog API fallback used:", error);
        setPageData(defaultData);
      }
    };

    fetchBlogData();
  }, []);

  return (
    <div className="blogPage">
      <style>{`
        .blogPage{
          width: 100%;
          margin: 0;
          padding: 0;
          background: #fff;
          overflow-x: hidden;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .blogHero{
          width: 100%;
          height: clamp(280px, 45vw, 650px);
          background-image:
            linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
            url("${pageData.hero_background_image}");
          background-size: cover;
          background-position: center;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 24px;
        }

        .blogHeroTitle{
          margin: 0;
          color: #fff;
          font-weight: 800;
          letter-spacing: -1px;
          font-size: clamp(38px, 8vw, 85px);
          text-align: center;
          line-height: 1;
        }

        .blogSection{
          width: 100%;
          padding: 56px 16px;
        }

        .blogContainer{
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .blogSectionTitle{
          font-size: clamp(22px, 3.2vw, 36px);
          font-weight: 800;
          margin: 0 0 10px;
          color: #111;
          text-align: center;
        }

        .blogUnderline{
          width: 60px;
          height: 2px;
          background: #00AEEF;
          margin: 0 auto 34px;
        }

        .blogGrid{
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        @media (max-width: 640px){
          .blogSection{ padding: 40px 14px; }
          .blogGrid{ grid-template-columns: 1fr; gap: 22px; }
        }

        .blogCard{
          display:block;
          text-decoration: none;
        }

        .blogImage{
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 18px;
          margin-bottom: 14px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.12);
          display: block;
        }

        @media (max-width: 640px){
          .blogImage{ height: 240px; border-radius: 16px; }
        }

        .blogTitle{
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 10px;
          line-height: 1.25;
          color: #222;
        }

        .blogText{
          font-size: 14px;
          color: #555;
          line-height: 1.65;
          margin: 0;
        }
      `}</style>

      <div className="blogHero">
        <h1 className="blogHeroTitle">{pageData.hero_title}</h1>
      </div>

      <section className="blogSection">
        <div className="blogContainer">
          <h2 className="blogSectionTitle">{pageData.section_title}</h2>
          <div className="blogUnderline" />

          <div className="blogGrid">
            {pageData.posts.map((item, index) => (
              <a key={index} href={item.link || "#"} className="blogCard">
                <img
                  className="blogImage"
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <h3 className="blogTitle">{item.title}</h3>
                <p className="blogText">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
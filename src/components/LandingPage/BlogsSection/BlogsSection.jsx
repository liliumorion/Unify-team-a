import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { IoIosArrowDropright } from "react-icons/io";

import BlogCard from "@/components/BlogCard";
import HorizontalCard from "@/components/BlogCard/HorizontalCard";
import Container from "@/components/container";

function BlogsSection({ blogs }) {
  const { t } = useTranslation();

  return (
    <Container className='lg:min-h-screen my-20 lg:my-0 flex flex-col justify-center'>
      {/* Title & Button */}
      <motion.div
        className='flex flex-col lg:flex-row items-center justify-between mb-12 lg:mb-16 gap-y-8'
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className='text-3xl md:text-5xl font-bold'>Our Latest Blogs</h2>
        <Link
          className='btn btn-secondary rounded-full btn-md w-[45%] lg:w-[15%] text-current bg-opacity-50 flex items-center gap-2'
          href='/blogs'
        >
          {t("common:buttons:readMore")}
          <IoIosArrowDropright className='text-xl' />
        </Link>
      </motion.div>
      {/* Cards Section */}
      <div className='grid grid-cols-3 gap-6 lg:gap-8'>
        <motion.div
          className='col-span-3'
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {blogs.length && <HorizontalCard {...blogs[0]} />}
        </motion.div>
        <motion.div
          className='col-span-3 flex flex-col lg:flex-row gap-y-6 gap-x-8'
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {blogs.slice(1, 3).map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
          {!blogs.length && <p>{t("common:buttons:noItemsfound")}</p>}
        </motion.div>
      </div>
    </Container>
  );
}

export default BlogsSection;

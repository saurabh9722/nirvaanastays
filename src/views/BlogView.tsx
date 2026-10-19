import React, { useState } from 'react';
import { Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { BlogPost, PageRoute } from '../types.ts';
import { BLOG_POSTS } from '../data/mockData.ts';
import { FallbackImage } from '../components/FallbackImage.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';

interface BlogViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectPost: (post: BlogPost) => void;
  onOpenEnquire: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigate,
  onSelectPost,
  onOpenEnquire,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Student Life in Pune',
    'Co-Living Guides',
    'Interior & Wellness',
    'Neighborhood Guide',
  ];

  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  const filteredPosts =
    activeCategory === 'All'
      ? otherPosts
      : otherPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Editorial Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          The Nirvana Journal · Page 6
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          Thoughts on Architecture, Student Life & Pune Living.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Curated perspectives on intentional living, Viman Nagar student culture, interior wellness, and co-living economics.
        </p>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#C87D65] text-white shadow-sm'
                  : 'bg-[#FFFDF9] text-[#2C2623] border border-[#E6E0D6] hover:bg-[#F3EFE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Editorial Banner */}
      {activeCategory === 'All' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PerspectiveCard
            maxTilt={9}
            scale={1.02}
            glare={true}
            glareOpacity={0.2}
            depth={20}
            className="rounded-3xl"
          >
            <div
              onClick={() => onSelectPost(featuredPost)}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-[#E6E0D6] bg-[#FFFDF9] shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F3EFE6]">
                <FallbackImage
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#7A8B7B] font-semibold uppercase tracking-wider">
                    <span>Featured Read</span>
                    <span>·</span>
                    <span>{featuredPost.category}</span>
                  </div>

                  <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2C2623] group-hover:text-[#C87D65] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between pt-6 border-t border-[#E6E0D6]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E6E0D6]">
                        <FallbackImage src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#2C2623] block leading-tight">{featuredPost.author.name}</span>
                        <span className="text-[11px] text-[#6E655F]">{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C87D65] group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PerspectiveCard>
        </section>
      )}

      {/* Grid of Other Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PerspectiveCard
              key={post.id}
              maxTilt={12}
              scale={1.025}
              glare={true}
              glareOpacity={0.22}
              depth={16}
              containerClassName="h-full"
              className="h-full rounded-2xl"
            >
              <article
                onClick={() => onSelectPost(post)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E6E0D6] bg-[#FFFDF9] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#F3EFE6]">
                    <FallbackImage
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#7A8B7B] font-medium">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span className="text-[#6E655F]">{post.readTime}</span>
                    </div>

                    <h3 className="font-editorial text-xl font-semibold text-[#2C2623] group-hover:text-[#C87D65] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#6E655F] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#E6E0D6] flex items-center justify-between text-xs">
                  <span className="text-[#6E655F]">{post.author.name}</span>
                  <span className="text-[#C87D65] font-semibold group-hover:underline flex items-center gap-1">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            </PerspectiveCard>
          ))}
        </div>
      </section>
    </div>
  );
};

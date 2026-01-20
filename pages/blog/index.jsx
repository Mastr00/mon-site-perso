import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog({ posts }) {
    return (
        <>
            <Head>
                <title>Blog – Mehdi Mamdouh</title>
                <meta name="description" content="Articles techniques sur l'IoT, l'électronique et le développement." />
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
                <div className="max-w-5xl mx-auto">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Le Blog Tech ✍️
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Tutoriels, retours d'expérience et veille technologique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posts.map((post) => (
                            <article key={post.slug} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 w-full relative">
                                    {/* Placeholder for post image - could use next/image if real image exists */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
                                        {post.frontMatter.title[0]}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> {post.frontMatter.date}
                                        </span>
                                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold">
                                            {post.frontMatter.tags[0]}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {post.frontMatter.title}
                                        </Link>
                                    </h2>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                                        {post.frontMatter.description}
                                    </p>

                                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all">
                                        Lire l'article <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('posts'));

    const posts = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
        const { data: frontMatter } = matter(markdownWithMeta);

        return {
            frontMatter,
            slug: filename.split('.')[0]
        };
    });

    return {
        props: {
            posts: posts.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
        }
    };
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const components = {
    // Custom components for markdown elements can go here
    // h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
};

export default function PostPage({ frontMatter, mdxSource }) {
    return (
        <>
            <Head>
                <title>{frontMatter.title} – Mehdi Mamdouh</title>
                <meta name="description" content={frontMatter.description} />
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
                <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">

                    {/* Hero Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-12 text-white">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-6 transition-colors font-medium">
                            <ArrowLeft size={18} /> Retour au blog
                        </Link>

                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                            {frontMatter.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm md:text-base text-indigo-100">
                            <span className="flex items-center gap-2">
                                <Calendar size={18} /> {frontMatter.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <User size={18} /> {frontMatter.author}
                            </span>
                            <div className="flex gap-2">
                                {frontMatter.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-white/20 rounded-md text-xs font-bold uppercase tracking-wider text-white">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
                        <MDXRemote {...mdxSource} components={components} />
                    </div>

                </article>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
    const { data: frontMatter, content } = matter(markdownWithMeta);
    const mdxSource = await serialize(content);

    return {
        props: {
            frontMatter,
            mdxSource,
            slug
        }
    };
}

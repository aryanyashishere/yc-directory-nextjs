// to go on the link we are making it :::
//     localhost:3000/startup/22343

import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import React, { Suspense } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import markdownit from "markdown-it";
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import {
  PLAYLIST_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";

const md = markdownit();


export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  
  //PARALLEL FETCHING
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);
  
  
  // SEQUENTIAL FETCHING
  
  // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  // const {selet: editorPosts} await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //   slug: "editor-picks-new",
  // } );
  const imageStyle = {
    width:"100%",
    height:"auto",
  }


  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "")

  return (
    <>

      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className='section_container'>

        {/* <img src="{post.image}" alt="thumbnail" className='w-full h-auto rounded-xl' /> */}
      

        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
        <Image
            src={post.image}
            alt="thumbnail"
            width={1000}
            height={500}
            // style={imageStyle}
            className=' rounded-xl'
          />

          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>

              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />

              <div>
                <p className="text-20-medium">
                  {post.author.name}
                </p>
                <p className='text-16-medium !text-black-300'>
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className='text-30-bold'>
            Pitch Details
            {/* we have to install the markdown-it npm package */}
            {/* after it run it  : npm i --save-dev @types/markdown-it */}
            </h3>
            {parsedContent ? (
              <article className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{__html : parsedContent}}/>
            ):(
              <p className='no-result'>
                No details provided.  
              </p>
            )}

          
        </div>

        <hr className='divider'/> 

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
            <View id={id}/>
        </Suspense>
      </section>
    </>

  )
}

export default page
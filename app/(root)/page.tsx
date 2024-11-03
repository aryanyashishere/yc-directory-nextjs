import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
// import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch , SanityLive} from "@/sanity/lib/live";
import { auth } from "@/auth";
import { Suspense } from "react";



export default async function Home({searchParams}: {
  searchParams : Promise<{query?: string}>
})

{

  const query = (await searchParams).query;
  const params = {search : query || null };
  
  const session = await auth();
  console.log(session?.id);
  
  
  console.log(query)
  console.log(params)
  
  // const posts = await client.fetch(STARTUPS_QUERY);
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});
  
  console.log(posts)
  // console.log(JSON.stringify(posts));

//   const posts = [{
//     _createdAt : new Date(),
//     views: 55,
//     author: {_id : 1, name: "Aryan"},
//     _id : 1,
//     description: "this is a description",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr3oWv5CB12097HzwwA-V6mmPdd8-ny_v5w&s",
//     category : "Robots",
//     title: "Stark Verse" 
//   }, 
// ];
  return (


    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your StartUp, <br />
          Connect With Entrepreneurs 
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and get noticed in Vitual Competitions
          
                  </p>

        <SearchForm query={query}/>

      </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {
        query ?  `Search Results for "${query}" +"${posts?.length}"` : `All Startups ${posts.length}`}
      </p>

      <ul className="mt-7 card_grid">
        <Suspense fallback={<p>Loading...</p>}>
        {posts?.length>0 ? (
          posts.map((post: StartupTypeCard)=>(
            <StartupCard key={post?._id} post={post} />
         
        ))
      ): (
        <p className="no-results" >No Startups Found</p>
      )}
      </Suspense>
      </ul>

    </section>
    <SanityLive/>
    </>
  );
}

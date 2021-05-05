import {FaPencilAlt,FaTimes} from 'react-icons/fa'
import {useRouter} from 'next/router'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function EventPage({data}) {
    const router=useRouter()

    function deleteEvent(e) {
        
    }
    return (
        <Layout>
            <div className={styles.event}>
        <div className={styles.controls}>
       <Link href={`/events/edit/${data.slug}`}>
           <a>
               <FaPencilAlt /> Edit Event
           </a>
       </Link>
       <a href='#' className={styles.delete}
       onClick={deleteEvent}>
           <FaTimes /> Delete Event
       </a>
        </div>

        <span>
            {new Date(data.date).toLocaleDateString('en-US')} at {data.time}
        </span>
        <h1>{data.name}</h1>
        {
            data.image && <div className={styles.image}>
                <Image 
                src={data.image.formats.medium.url}
                width={960}
                height={600}
        />
                         </div>
                    
        }
        <h3>Performers:</h3>
        <p>{data.performers}</p>
        <h3>Description</h3>
        <p>{data.description}</p>
        <h3>Venue: {data.venue}</h3>
        <p>{data.address}</p>
        <Link href='/'>
            <a className={styles.back}>
            {'<'} Go Back
            </a>
        </Link>
            </div>
        </Layout>
    )
}


export async function getStaticPaths(){
    const res=await fetch(`${API_URL}/events`)
    const events =await res.json()

    const paths=events.map(evt=>(
        {
            params:{slug:evt.slug}
        }
    ))

    return {
        paths,
        fallback:true,
    }
}

export async function getStaticProps({params:{slug}}){
    
    const res=await fetch(`${API_URL}/events?slug=${slug}`)
  
    const events =await res.json()
  
      return {
          props:{data:events[0]},
          revalidate:1
      }
  }


// export async function getServerSideProps({query:{slug}}){
    
//   const res=await fetch(`${API_URL}/api/events/${slug}`)

//   const events =await res.json()

//     return {
//         props:{data:events[0]}
//     }
// }
import Link from "next/link"
import {FaPencilAlt,FaTimes} from 'react-icons/fa'
import styles from '@/styles/DashboardItem.module.css'

export default function DashboardEvent({itm,deleteEvent}) {


    return (
        <div className={styles.event}>
           <h4>
               <Link href={`/events/${itm.slug}`}>
                   <a>{itm.name}</a>
               </Link>
            </h4> 
            <Link href={`/events/edit/${itm.id}`}>
                <a className={styles.edit}>
                <FaPencilAlt /><span>Edit Event</span>
                </a>
            </Link>
            <a href='#' className={styles.delete} onClick={()=>deleteEvent(itm.id)}>
            <FaTimes />
            <span>Delete</span>
            </a>
        </div>

    )
}

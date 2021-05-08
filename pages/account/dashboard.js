import DashboardEvent from "@/components/DashboardEvent"
import Layout from "@/components/Layout"
import {useRouter} from 'next/router'
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import styles from '@/styles/Dashboard.module.css'
import { toast } from "react-toastify"


export default function DashboardPage({data,token}) {

    const router=useRouter()

    async function handleDelete(id) {
        if(window.confirm('Are you sure?')){
            const res= await fetch(`${API_URL}/events/${id}`,{
                method:'DELETE',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const rsp=await res.json()
            if(!res.ok){
                if(res.status===401 || res.status===403){
                    return toast.error('Not Authorized')
                }
                toast.error(rsp.message)
            }else{
                router.reload()
            }
        }
    }
    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
            <h1>Dashboard</h1>
            <h3>My Events</h3>
            {
                data?.map(itm=>{
                    return <DashboardEvent key={itm.id} itm={itm} 
                    deleteEvent={handleDelete}/>
                })
            }
            </div>
        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const {token}=parseCookies(req)
    const res=await fetch(`${API_URL}/events/me`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    const data=await res.json()
    return {
        props:{data,token},
    }
}

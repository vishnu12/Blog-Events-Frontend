import {useState} from 'react'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useRouter} from 'next/router'
import Link from 'next/link';
import Layout from "@/components/Layout";
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css'
import { parseCookies } from '@/helpers/index';

export default function AddPage({token}) {

    const [values, setValues] = useState({
        name:'',
        performers:'',
        venue:'',
        address:'',
        date:'',
        time:'',
        description:''
    })

    const router=useRouter()

    function handleChange(e) {
        const {name,value} =e.target
        setValues({
            ...values,
            [name]:value
        })
    }

   async function handleSubmit(e) {
       e.preventDefault()
       const hasEmpty=Object.values(values)
                            .some(ele=>ele==='')
        
       if(hasEmpty){
           toast.error('Please fill in all fields')
       } 
       
       const res=await fetch(`${API_URL}/events`,{
           method:'POST',
           headers:{
               'Content-Type':'application/json',
               Authorization:`Bearer ${token}`
           },
           body:JSON.stringify(values)
       })

       if(!res.ok){
         if(res.status===403|| res.status===401){
          toast.error('No token provided')
          return
         }
           toast.error('Something went wrong')
       }else{
           const evt=await res.json()
           router.push(`/events/${evt.slug}`)
       }
    }
    return (
        <Layout title='Add new event'>
            <Link href='/events'>Go Back</Link>
            <h1>Add event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
           <div className={styles.grid}>
           <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    )
}

export async function getServerSideProps({req}) {
  const {token}=parseCookies(req)

  return {
    props:{token}
  }
}

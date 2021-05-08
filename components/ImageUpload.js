import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function ImageUpload({
    evtId,
    imageUploaded,
    token
}) {

    const [image, setImage] = useState(null)

    async function handleSubmit(e) {
      e.preventDefault()

      const formData=new FormData()
      formData.append('files',image)
      formData.append('ref','events')
      formData.append('refId',evtId)
      formData.append('field','image')

    const res=await fetch(`${API_URL}/upload`,{
        method:'POST',
        headers:{
          Authorization:`Bearer ${token}`
        },
        body:formData
    })

    if(res.ok){
        imageUploaded()
    }
    }

    function handleChange(e) {
        setImage(e.target.files[0])
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
          <input type='file' onChange={handleChange} />
                </div>
                <input type='submit' value='Upload Image' className='btn'/>
            </form>
        </div>
    )
}

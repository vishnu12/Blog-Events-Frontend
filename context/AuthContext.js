
import {createContext,useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import { API_URL, NEXT_URL } from '../config'



const AuthContext=createContext()

export const AuthProvider=({children})=>{
    
    const router=useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        isLoggedIn()
    },[])

    //register
     async function register(user) {
        const res=await fetch(`${NEXT_URL}/api/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })

        const data=await res.json()
    
        if(res.ok){
           setUser(data.user)
           router.push('/account/dashboard')
        }else{
            setError(data.message)
        }
     }

    //login

    async function login({email:identifier,password}) {
        const res=await fetch(`${NEXT_URL}/api/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                identifier,
                password
            })
        })

        const data=await res.json()
    
        if(res.ok){
           setUser(data.user)
           router.push('/account/dashboard')
        }else{
            setError(data.message)
            setError(null)
        }
    }

    //logout

   async function logout() {
       const res=await fetch(`${NEXT_URL}/api/logout`,{
           method:'POST'
       })

       if(res.ok){
           setUser(null)
           router.push('/')
       }
   }

    //isLogged in
    async function isLoggedIn() {
        const res=await fetch(`${NEXT_URL}/api/user`)
        const data=await res.json()
        if(res.ok){
            setUser(data.user)
        }else{
            setUser(null)
        }
    }

    return <AuthContext.Provider value={
        {
            user,
            error,
            register,
            login,
            logout
        }
    }>
        {children}
    </AuthContext.Provider>
}

export default AuthContext
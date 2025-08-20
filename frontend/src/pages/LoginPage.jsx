import { useState } from 'react'
import api from '../services/api.js'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const [formData, setFormData] = useState({email:'', password:''})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)


    try {
      const response = await api.post("/auth/login", formData);
       toast.success(response.data.message || 'Login successful');
       navigate("/dashboard")
    } catch (error) {
       toast.error(error.response?.data?.message || 'Login failed');
    }
    finally{
      setLoading(false)
    }

  }





  return (
   <div className="flex items-center justify-center min-h-screen bg-base-200">

    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6 flex flex-row gap-4">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading? "loggin.." : "submit"}</button>
          <Link to="/register">
          <button className="btn btn-primary">Register</button>
          </Link>
          
        </div>    
      </form>
    </div>
</div>

  )
}

export default LoginPage
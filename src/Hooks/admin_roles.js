import axios from "axios"
import { toast } from "react-toastify"
import {  useState } from "react"
import { BASE_SERVER_URL } from "../Config/paths"
import { useUserContext } from "../Contexts"

function useAddAdminRole() {
  const { config } = useUserContext()
  const [loading, setLoading] = useState(false)

  const addAdminRole = async (data, password) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/admins/type/create`,
        data,
      )
      const result = response.data

      if (result?.error === 0) {
        toast.success(result.message)
        return true
      }
    } catch (error) {
      console.error("Error:", error.response.data)
      if (error?.response?.data?.error) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred while adding Admin.")
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  return { addAdminRole, loading }
}

export {
    useAddAdminRole
}
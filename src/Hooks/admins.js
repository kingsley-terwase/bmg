import axios from "axios"
import { toast } from "react-toastify"
import {BASE_SERVER_URL} from "../Config/paths"
import {useUserContext} from "../Contexts"

function useAddAdmin() {
  const { config } = useUserContext()
  return async (data, password) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/admins/create`,
        data,
      )
      const result = response.data
      console.log(result)
      if (result?.error === 0) {
        toast.success(result.message)
        return true
      }
      if (result?.error === 2) {
        toast.success(result.message)
        return false
      }
      if (result?.error) {
        toast.error(result?.message)
        return false
      }
    } catch (error) {
      console.error("Error:", error.response.data)
      if (error.response.data?.error) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred while adding Admin.")
      }
      return false
    }
  }
}

export {
  useAddAdmin
}
import axiosInstance from "@/utils/axios"
import { toast } from "sonner"
import { create } from "zustand"

interface Data {
  problem: string
  difficulty: string
}

interface SessionStore {
  isLoading: boolean
  createSession: (data: Data) => Promise<any>
}

export const sessionStore = create<SessionStore>((set) => ({
  isLoading: false,

  createSession: async (data) => {
    try {
      set({ isLoading: true })
      const response = await axiosInstance.post("/session", data)
      set({ isLoading: false })

      toast.success("Session created successfully")
      console.log("Session response:", response.data)

      return response.data // returns ApiResponse object
    } catch (error: any) {
      console.error("Error creating session:", error)
      toast.error(error?.response?.data?.message || "Error while creating session")
      set({ isLoading: false })
      throw error
    }
  },
}))

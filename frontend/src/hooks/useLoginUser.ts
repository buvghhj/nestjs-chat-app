import { useState } from "react"
import { API_URL } from "../constants/urls"
import client from "../constants/apollo-client"
import { UNKNOWN_ERROR_MESSAGE } from "../constants/errors"

interface LoginRequest {

    email: string

    password: string

}

const useLoginUser = () => {

    const [error, setError] = useState<string>()

    const login = async (req: LoginRequest) => {

        const res = await fetch(
            `${API_URL}/auth/login`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req)
            },

        )

        if (!res.ok) {

            if (res.status === 401) {

                setError('Credentials are not valid')

            } else {

                setError(UNKNOWN_ERROR_MESSAGE)

            }

            return

        }

        setError("")

        await client.refetchQueries({ include: 'active' })

    }

    return { login, error }

}

export { useLoginUser }
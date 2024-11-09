import { useMutation } from "@apollo/client"
import { graphql } from "../gql"


const registerUserDocument = graphql(`

   mutation RegisterUser($registerInput: RegisterInput!){

      register(registerInput: $registerInput){

        _id
        email

      }

   }

`)

const useRegisterUser = () => {

   return useMutation(registerUserDocument)

}

export { useRegisterUser }
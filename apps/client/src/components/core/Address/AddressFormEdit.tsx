import { useAddress } from "@/context/AddressContext";
import { createAddressGQL } from "@/lib/Services";
import { useUser } from "@/lib/supabase-react";
import { UserAddress } from "@/lib/types";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";

export const AddressFormEdit = ({ data }: { data?: UserAddress }) => {
  const user = useUser();
  const { actions: { setAddress, refetch } } = useAddress();
  const [createAddress] = useMutation(createAddressGQL)
  function validateName(value?: string) {
    let error;
    if (!value) {
      error = "Хоосон байж болохгүй шүү!";
    }
    return error;
  }

  const submitHandle = async (values: UserAddress, actions: FormikHelpers<UserAddress>) => {
    await createAddress({
      variables: {
        data: {
          // "id": "7527805b-7dcb-47b7-928b-82599d8c652a",
          "username": values.username,
          "address_city": values.address_city,
          "address_district": values.address_district,
          "address_street": values.address_street,
          "address_info": values.address_info,
          "contact_phone": values.contact_phone,
          "contact_email": values.contact_email
        }
      }
    }).then(({ data }) => {
      setAddress(data.createAddress[0])
      refetch()
    })

    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={data || {
        username: user ? user.user_metadata.name : "",
        address_city: "",
        address_district: "",
        address_street: "",
        address_info: "",
        contact_phone: "",
        contact_email: "",
      } as any}
      onSubmit={submitHandle}
    >
      {(props) => (
        <Form>
          <Field name="username" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.username && form.touched.username}>
                <FormLabel>Хэрэглэгчийн нэр</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="address_city" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.address_city && form.touched.address_city}>
                <FormLabel>Хот</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.address_city}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="address_district" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.address_district && form.touched.address_district}>
                <FormLabel>Дүүрэг</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.address_district}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="address_street" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.address_street && form.touched.address_street}>
                <FormLabel>Хороо</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.address_street}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="address_info" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.address_info && form.touched.address_info}>
                <FormLabel>Байр, тоот</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.address_info}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="contact_phone" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.contact_phone && form.touched.contact_phone}>
                <FormLabel>Утасны дугаар</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.contact_phone}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="contact_email" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.contact_email && form.touched.contact_email}>
                <FormLabel>И-Мэйл хаяг</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.contact_email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Хаяг үүсгэх
          </Button>
        </Form>
      )}
    </Formik>
  );
};

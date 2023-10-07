import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from "yup"
import { apiClient } from './ApliClient';

export type TformData = {
  name: string,
  whatsapp_number: string,
  city: string,
  gst: string,
  bill: string | Blob | File
}


function ClaimForm({ setSuccess }: { setSuccess: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [file, setFile] = useState<File>()


  const formik = useFormik<TformData>({
    initialValues: {
      name: "",
      whatsapp_number: "",
      city: "",
      gst: '',
      bill: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('name is required'),
      city: Yup.string()
        .required('city is required'),
      gst: Yup.string()
        .required('gst is required')
        .min(15, 'Must be 15 digits')
        .max(15, 'Must be 15 digits'),
      whatsapp_number: Yup.string().required("required valid whatsapp number")
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
      bill: Yup.mixed<File>().required("bill is required")
        .test("size", "size is allowed only less than 10mb",
          file => {
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(file.size <= 10 * 1024 * 1024)
            return true
          }
        )
        .test("type", " allowed only .jpg, .jpeg, .png, .gif .pdf .csv .xlsx .docs",
          file => {
            const Allowed = ["image/png", "image/jpeg", "image/gif", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/pdf"]
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(Allowed.includes(file.type))
            return true
          }
        )
    }),
    onSubmit: async (values: TformData) => {
      let formdata = new FormData()
      let Data = {
        name: values.name,
        mobile: values.whatsapp_number,
        city: values.city,
        gst: values.gst,
        bill: ""
      }
      formdata.append("body", JSON.stringify(Data))
      formdata.append("media", values.bill)
      await apiClient.post(`alps`, formdata);
      setSuccess(true)
    }
  });

  useEffect(() => {
    if (file)
      setFile(file)
  }, [file])

  return (
    <div className='claim-form container'>
      <form className='d-flex flex-column' onSubmit={formik.handleSubmit}>
        <p className='fs-6 p-1'>Name *</p>
        <input
          className='rounded p-2 name'
          type="text"
          placeholder='Enter your name'
          {...formik.getFieldProps('name')}
        />
        <p className='help_text'>{formik.touched.name && formik.errors.name ? String(formik.errors.name) : ""}</p>

        <p className='fs-6 p-1'>Whatsapp Number *</p>
        <input
          type="number"
          className='rounded p-2 whatsapp_number'
          placeholder='Enter your 10 digit Whatsapp Number'

          {...formik.getFieldProps('whatsapp_number')}
        />
        <p className='help_text'>{formik.touched.whatsapp_number && formik.errors.whatsapp_number ? String(formik.errors.whatsapp_number) : ""}</p>

        <p className='fs-6 p-1'>City *</p>
        <input
          className='rounded p-2 '
          placeholder='Enter your city'

          {...formik.getFieldProps('city')}
        />
        <p className='help_text'>{formik.touched.city && formik.errors.city ? String(formik.errors.city) : ""}</p>


        <p className='fs-6 p-1'>GST Number *</p>
        <input
          className='rounded p-2 '
          placeholder='Enter your GST'

          {...formik.getFieldProps('gst')}
        />
        <p className='help_text'>{formik.touched.gst && formik.errors.gst ? String(formik.errors.gst) : ""}</p>


        <p className='fs-6 p-1'>Upload Bill *</p>
        <input
          className='rounded p-2 bill form-control border-3'
          type="file"
          name="Upload Bill"
          required
          onBlur={formik.handleBlur}
          onChange={(e) => {
            e.preventDefault()
            let files = e.currentTarget.files
            if (files) {
              let file = files[0]
              formik.setFieldValue("bill", file)
            }
          }}
        />
        <p className='help_text'>{formik.touched.bill && formik.errors.bill ? String(formik.errors.bill) : ""}</p>
        {/* @ts-ignore */}
        {formik.values.bill && <img alt="Document attached but Preview not available" src={formik.values.bill && URL.createObjectURL(formik.values.bill)} />}
        <button className='text-white fs-4 my-4 bg-dark rounded border-1 ' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ClaimForm

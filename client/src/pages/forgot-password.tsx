/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import React, { useState, useEffect } from 'react'

import Button from '~/components/atoms/Button'
import NextHead from '~/components/atoms/NextHead'
import { useAuthMethods } from '~/hooks/authMethods'
import CustomForm from '~/components/molecules/CustomForm'
import AdminAuthTemplate from '~/components/templates/AdminAuthTemplate'
import { ForgotPasswordFormSchema, ResetLinkSubmitFormSchema } from '~/shared/validation'

type SetupNewPasswordInitialValue = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

const ForgotPassword: NextPage = (): JSX.Element => {
  const { state }: any = Router?.router || {}
  const { token, email } = state?.query || {}
  const { ResetLinkSubmit, ForgotPasswordSubmit } = useAuthMethods()
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true)
  const [isLinkClicked, setIsLinkClicked] = useState<boolean>(false)

  useEffect(() => {
    setIsLinkClicked(token && email ? true : false)
  }, [token, email, isLinkClicked])

  const setRequestResetLinkInitialValue: { email: string } = {
    email: ''
  }
  const RequestResetLink = () => {
    return (
      <Formik
        initialValues={setRequestResetLinkInitialValue}
        validationSchema={ResetLinkSubmitFormSchema}
        onSubmit={async ({ email }: { email: string }) => {
          await ResetLinkSubmit(email)
        }}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => {
          return (
            <Form>
              <div className="flex flex-col gap-4">
                <CustomForm
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div className="mt-10 mb-5 flex flex-row gap-3">
                <Button
                  value="Go Back"
                  onClick={(e) => {
                    e.preventDefault()
                    Router.push('/sign-in')
                  }}
                  className="!border-2 !border-barclerk-10 !bg-transparent !text-barclerk-10 hover:!border-transparent hover:!bg-barclerk-10/70 hover:!text-white"
                />
                <Button isSubmitting={isSubmitting} value="Continue" />
              </div>
            </Form>
          )
        }}
      </Formik>
    )
  }

  const setupNewPasswordInitialValue = {
    token,
    email,
    password: '',
    password_confirmation: ''
  }

  const SetupNewPassword = (
    <div className="flex flex-col">
      <Formik
        initialValues={setupNewPasswordInitialValue}
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={async (data: SetupNewPasswordInitialValue) => {
          await ForgotPasswordSubmit(data)
        }}
      >
        {({ isSubmitting }): any => {
          return (
            <Form className="-mt-3">
              <div className="flex flex-col gap-3">
                <CustomForm
                  label="Password"
                  name="password"
                  type={isPassHidden ? 'password' : 'text'}
                  placeholder="•••••••••••"
                  isPassHidden={isPassHidden}
                  setIsPassHidden={setIsPassHidden}
                />
                <CustomForm
                  label="Confirm Password"
                  name="password_confirmation"
                  type={isPassHidden ? 'password' : 'text'}
                  placeholder="•••••••••••"
                />
              </div>
              <div className="mt-10 mb-5 flex flex-row gap-3">
                <Button
                  value="Go Back"
                  onClick={(e) => {
                    e.preventDefault()
                    Router.push('/forgot-password')
                  }}
                  className="!border-2 !border-barclerk-10 !bg-transparent !text-barclerk-10 hover:!border-transparent hover:!bg-barclerk-10/70 hover:!text-white"
                />
                <Button isSubmitting={isSubmitting} value="Continue" />
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )

  return (
    <>
      <NextHead key="forgot" title="BarClerk | Sign In" />
      <AdminAuthTemplate hasBorder={true}>
        <div className="flex w-full min-w-[315px] max-w-[360px] flex-col gap-10">
          <header className="flex h-full flex-col items-center justify-center">
            <h1 className="text-[23px] font-semibold text-dark mobile:!text-center">
              {isLinkClicked ? 'Setup your new password' : 'Request password reset link'}
            </h1>
          </header>
          {isLinkClicked ? SetupNewPassword : <RequestResetLink />}
        </div>
      </AdminAuthTemplate>
    </>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default ForgotPassword
